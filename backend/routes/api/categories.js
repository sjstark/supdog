const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Ticket, SoldTicket, Category } = require('../../db/models');


const router = express.Router({ mergeParams: true });

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {

    const categoryId = parseInt(req.params.id, 10)

    let { start, amount } = req.query
    start = start ? parseInt(start, 10) : 0
    amount = amount ? parseInt(amount, 10) : 10


    let events = await Event.findAll({
      where: {
        categoryId: categoryId
      },
      limit: amount,
      offset: start
    })


    return res.json(events)

  })
)

router.get(
  '',
  asyncHandler(async (req, res) => {
    res.json(await Category.findAll({
      attributes: ['id', 'title', 'icon', 'color']
    }))
  })
)

router.get(
  '/:categoryId(\\d+)/count',
  asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.categoryId, 10)
    res.json(await Event.count({ where: { categoryId } }))
  })
)

module.exports = router
