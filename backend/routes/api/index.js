const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const ticketsRouter = require('./tickets.js');
const categoriesRouter = require('./categories')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/tickets', ticketsRouter)
router.use('/categories', categoriesRouter)

module.exports = router;
