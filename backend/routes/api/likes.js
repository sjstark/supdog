const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Like } = require('../../db/models');


const router = express.Router({ mergeParams: true });

router.get(
  '',
  requireAuth,
  asyncHandler(async (req, res) => {
    let userId = req.user.id

    let likedEvents = await Event.findAll({
      include: ['organizer', 'tickets', 'category', 'eventDates', Like],
      where: {
        [Like.userId]: userId
      }
    })

    res.json({events: likedEvents})
  })
)

module.exports = router
