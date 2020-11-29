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
  requireAuth,
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
            attributes: ['title','eventPicURL'],
          }
        },
        where: {
          userId: req.user.id
        },
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

router.delete(
  '/:ticketId(\\d+)/one',
  requireAuth,
  asyncHandler(async (req, res) => {
    let {ticketId} = req.params

    console.log(ticketId)

    let ticket = await SoldTicket.findOne({
      where: {
        userId: req.user.id,
        ticketId
      }
    })

    if (ticket) {
      let ticketToUpdate = await Ticket.findByPk(ticketId)
      await ticket.destroy()
      await ticketToUpdate.decrement('sold')
      return res.json('Success')
    } else {
      return res.json('Fail')
    }
  })
)

router.delete(
  '/:ticketId(\\d+)/all',
  requireAuth,
  asyncHandler(async (req, res) => {
    let {ticketId} = req.params

    let tickets = await SoldTicket.findAll({
      where: {
        userId: req.user.id,
        ticketId
      }
    })

    if (tickets.length > 0) {
      let ticketToUpdate = await Ticket.findByPk(ticketId)
      tickets.forEach(async ticket => {
        await ticket.destroy()
        await ticketToUpdate.decrement('sold')
      })
      return res.json('Success')
    } else {
      return res.json('Fail')
    }
  })
)

module.exports = router
