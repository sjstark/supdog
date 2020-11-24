const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Ticket, SoldTicket } = require('../../db/models');

const {
  s3,
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

const router = express.Router({ mergeParams: true });

//
// ─── MIDDLEWARE FUNCTIONS ───────────────────────────────────────────────────────
//

// const validateEvent = [
//   check('title')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4, max: 50 })
//     .withMessage('Please provide an event title between 4 and 50 characters in length.'),
//   check('summary')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 5, max: 120 })
//     .withMessage('Please provide an event summary between 5 and 50 characters in length.'),
//   // Checks whether or not the organizer user's id exists in database
//   check('organizer')
//     .exists({ checkFalsy: true })
//     .custom(value => {
//       return User.findByPk(value).then(user => {
//         if (!user) return Promise.reject('You must be logged in as a valid user to create an event!')
//         return true
//       })
//     }),
//   handleValidationErrors,
// ];

router.get(
  '',
  asyncHandler(async (req, res) => {
    let paramsKeys = Object.keys(req.params)

    let tickets = []

    //depending on if entry param is event or user, find all keys where the id is equal to that.
    if (paramsKeys.includes('eventId')) {
      tickets = await Ticket.findAll({
        where: {
          eventId: req.params.eventId
        }
      })
    } else {
      tickets = await SoldTicket.findAll({
        include: {
          model: Ticket,
          attributes: ['name'],
          include: {
            model: Event,
            attributes: ['title'],
          }
        },
        where: {
          userId: req.params.userId
        }
      })
    }

    res.json(tickets)
  })
)

// router.post(
//   '',
//   validateTicket,
//     (req, res) => {

// })

router.post(
  '/:ticketId',
  requireAuth,
  asyncHandler(async (req, res) => {
    let ticket = await Ticket.findByPk(parseInt(req.params.ticketId, 10))
    let ticketSale = await ticket.sellTicketTo(req.user.id)
    if (!ticketSale) return res.json('Ticket is sold out for this event')
    return res.json(ticketSale)
  })
)

module.exports = router
