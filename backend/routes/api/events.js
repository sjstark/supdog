const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Ticket, Sequelize } = require('../../db/models');

const ticketsRouter = require('./tickets')

const {
  s3,
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

const router = express.Router();

router.use('/:eventId/tickets', ticketsRouter)

//
// ─── MIDDLEWARE FUNCTIONS ───────────────────────────────────────────────────────
//

const validateEvent = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 50 })
    .withMessage('Please provide an event title between 4 and 50 characters in length.'),
  check('summary')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 120 })
    .withMessage('Please provide an event summary between 5 and 50 characters in length.'),
  // Checks whether or not the organizer user's id exists in database
  check('organizer')
    .exists({ checkFalsy: true })
    .custom(value => {
      return User.findByPk(value).then(user => {
        if (!user) return Promise.reject('You must be logged in as a valid user to create an event!')
        return true
      })
    }),
  handleValidationErrors,
];

router.post(
  '',
  singleMulterUpload('eventPic'),
  requireAuth,
  validateEvent,
  asyncHandler(async (req, res) => {
    const {
      title,
      summary,
      about,
      organizer,
    } = req.body;

    const tickets = JSON.parse(req.body.tickets)
    // tickets = [];
    // Object.keys(req.body).filter(key => key.startsWith('ticket')).forEach(ticketKey => {
    //   tickets.push(req.body[ticketKey])
    // })


    let eventPicURL = null;
    if (req.file) eventPicURL = await singlePublicFileUpload(req.file, 'event-pics')

    const event = await Event.create({ title, summary, about, eventPicURL, organizer })

    tickets.forEach(async ticket => {
      let newTicket = { name: ticket.name, quantity: parseInt(ticket.quantity, 10), eventId: event.id }
      await Ticket.create(newTicket)
    })

    return res.json(event)
  })
)

router.get(
  '',
  asyncHandler(async (req, res) => {
    const { start, amount } = req.query

    const events = await Event.findAll({
      offset: start,
      limit: amount,
      include: ['organizer', 'tickets', 'category']
    })

    return res.json({ events })
  })
)

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const event = await Event.findByPk(id, {
      include: ['organizer', 'tickets', 'category']
    })
    res.json(event)
  })
)

module.exports = router
