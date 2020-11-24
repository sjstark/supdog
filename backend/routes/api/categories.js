const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Ticket, SoldTicket } = require('../../db/models');

const router = express.Router({ mergeParams: true });

router.get(
  '/:categoryId(\\d+)',
  asyncHandler(async (req, res) => {

    const categoryId = parseInt(req.params.categoryId, 10)
    let { start, amount } = req.query
    start = parseInt(start, 10)
    amount = parseInt(amount, 10)

    let events = Event.findAll({
      where: {
        categoryId
      },
      limit: amount,
      offset: start
    })

    res.json(events)

  })
)

router.get(
  '/:categoryId(\\d+)/count',
  asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10)
    return await Event.count({ where: { categoryId } })
  })
)

module.exports = router