const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Ticket, EventDate, Sequelize, Like } = require('../../db/models');
const { Op } = Sequelize

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
      categoryId,
    } = req.body;

    const tickets = JSON.parse(req.body.tickets)
    const eventDates = JSON.parse(req.body.eventDates)
    // tickets = [];
    // Object.keys(req.body).filter(key => key.startsWith('ticket')).forEach(ticketKey => {
    //   tickets.push(req.body[ticketKey])
    // })


    let eventPicURL = null;
    if (req.file) eventPicURL = await singlePublicFileUpload(req.file, 'event-pics')

    const event = await Event.create({ title, summary, about, eventPicURL, organizerId: organizer, categoryId })

    tickets.forEach(async ticket => {
      let newTicket = { name: ticket.name, quantity: parseInt(ticket.quantity, 10), eventId: event.id }
      await Ticket.create(newTicket)
    })

    eventDates.forEach(async eventDate => {
      let newDate = { eventId: event.id, start: new Date(eventDate.start), end: new Date(eventDate.end) };
      await EventDate.create(newDate)
    })

    return res.json(event)
  })
)

router.put(
  '',
  singleMulterUpload('eventPic'),
  requireAuth,
  validateEvent,
  asyncHandler(async (req, res) => {
    const event = await Event.findByPk(req.body.eventId)

    if (req.user.id !== event.organizerId) res.redirect('/')

    const {
      title,
      summary,
      about,
      organizer,
      categoryId,
      eventPic
    } = req.body;

    const tickets = JSON.parse(req.body.tickets)
    const eventDates = JSON.parse(req.body.eventDates)
    // tickets = [];
    // Object.keys(req.body).filter(key => key.startsWith('ticket')).forEach(ticketKey => {
    //   tickets.push(req.body[ticketKey])
    // })

    let eventPicURL = null;
    if (eventPic.startsWith('http')) {
      eventPicURL = eventPic
    } else {
      await singleMulterUpload('eventPic')
      eventPicURL = await singlePublicFileUpload(req.file, 'event-pics')
    }

    event.title = title ? title : event.title
    event.summary = summary ? summary : event.summary
    event.about = about ? about : event.about
    event.organizerId = organizer ? organizer : event.organizerId
    event.categoryId = categoryId ? categoryId : event.categoryId
    event.eventPicURL = eventPicURL ? eventPicURL : event.eventPicURL

    await event.save()

    tickets.forEach(async newTicket => {
      const ticket = await Ticket.findByPk(newTicket.id)
      ticket.name = newTicket.name
      ticket.quantity = parseInt(newTicket.quantity, 10)
      await ticket.save()
    })

    eventDates.forEach(async newEventDate => {
      const eventDate = await EventDate.findByPk(newEventDate.id)
      eventDate.start = new Date(newEventDate.start)
      eventDate.end = new Date(newEventDate.end)
      await eventDate.save()
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
      include: ['organizer', 'tickets', 'category', 'eventDates']
    })

    return res.json({ events })
  })
)

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const event = await Event.findByPk(id, {
      include: [
        'organizer',
        {
          model: Ticket,
          as: 'tickets',
          order: ['id']
        },
        'category',
        {
          model: EventDate,
          as: 'eventDates',
          order: ['start']
        }
      ]
    })
    let like = await Like.findOne({
      where: {
        eventId: id,
        userId: req.user.id
      }
    })

    if (like) {
      event.liked = true
    }
    res.json(event)
  })
)

router.post(
  '/:id(\\d+)/like',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)

    const like = await Like.create({eventId: id, userId: req.user.id})

    res.json(like)
  })
)

router.delete(
  '/:id(\\d+)/like',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)

    let like = await Like.findOne({
      where: {
        eventId: id,
        userId: req.user.id
      }
    })

    await like.destroy()

    res.json()
  })
)

router.get(
  '/:id(\\d+)/next-date',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const date = await EventDate.min('start', {
      where: {
        eventId: id,
        start: {
          [Op.gte]: Sequelize.fn('now')
        }
      }
    })
    res.json(date)
  })
)

router.get(
  '/my-events',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { start, amount } = req.query

    const events = await Event.findAll({
      where: {
        organizerId: req.user.id
      },
      include: ['organizer', 'tickets', 'category', 'eventDates'],
      offset: start,
      limit: amount,

    })
    res.json({events})
  })
)

router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const { start, amount } = req.query

    const searchParam = decodeURI(req.query.search)

    const events = await Event.findAll({
      where: {
        title: {
          [Op.iLike]: `%${searchParam}%`
        }
      },
      include: ['organizer', 'tickets', 'category', 'eventDates'],
      limit: amount,
      offset: start
    })

    res.json({ events })
  })
)

module.exports = router
