'use strict';
const { Sequelize, User, Category, Event, Ticket } = require('../models');

const fetch = require('node-fetch')

const faker = require('faker');

const seederUtils = require('./utils');
const { getRandomInt } = require('./utils');

const getImage = async (width, height) => {
  let res = await fetch(`https://picsum.photos/${width}/${height}`)
  return res.url
}

const Op = Sequelize.Op;

let fakeUsers;
let fakeUserIds
let demoUser

let createdEvents

let categories = {}

let fakeEvents = [
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    fakeUserIds = fakeUsers.map(user => user.id)
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    fakeUserIds = [...fakeUserIds, demoUser.id]

    createdEvents = await Event.findAll({
      where: {
        organizerId: { [Op.in]: [...fakeUserIds] }
      }
    })

    console.log('Creating Tickets and Dates for Each Event')
    createdEvents.forEach(async event => {
      // Create tickets for each event
      let ticketTypes = seederUtils.getNTicketTypes(seederUtils.getRandomInt(1,5))
      let tickets = ticketTypes.map(ticketType => {
        return {
          eventId: event.id,
          name: ticketType,
          quantity: seederUtils.getRandomInt(5, 100)
        }
      })
      await queryInterface.bulkInsert('Tickets', tickets)

      // Create EventDates for each event
      let dates = []
      for (let i = 0 ; i < seederUtils.getRandomInt(1,3); i++) {
        dates.push({...seederUtils.getRandomEventDate(), eventId: event.id})
      }
      await queryInterface.bulkInsert('EventDates', dates)

    })
    console.log('Completed Tickets and Dates Insertions')


  },

  down: async (queryInterface, Sequelize) => {
    fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    fakeUserIds = fakeUsers.map(user => user.id)
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    createdEvents = await Event.findAll({
      where: {
        organizerId: { [Op.in]: [...fakeUserIds] }
      }
    })
    let createdEventIds = createdEvents.map(event => event.id)


    queryInterface.bulkDelete('Tickets', {
      eventId: { [Op.in]: [createdEventIds]}
    })
    .then(() => {
      queryInterface.bulkDelete('EventDates', {
        eventId: { [Op.in]: [createdEventIds]}
      })
    })
  }
};
