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
