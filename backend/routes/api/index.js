const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const ticketsRouter = require('./tickets.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/tickets', ticketsRouter)

module.exports = router;
