'use strict';

const { Event, User, Ticket, SoldTicket } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let demoEvent = await Event.findOne({
      where: {
        title: 'Thanksgiving Day Parade'
      }
    })
    return queryInterface.bulkInsert('Tickets', [
      {
        eventId: demoEvent.id,
        name: 'Demo General Admission',
        quantity: 50,
        sold: 0,
      },
      {
        eventId: demoEvent.id,
        name: 'Demo VIP Access',
        quantity: 12,
        sold: 0,
      },
    ])
      .then(async (res) => {
        let GATickets = await Ticket.findOne({ where: { name: 'Demo General Admission' } })
        let VIPTickets = await Ticket.findOne({ where: { name: 'Demo VIP Access' } })
        let demoUser = await User.findOne({ where: { email: 'demo@user.io' } })
        await GATickets.sellTicketTo(demoUser.id)
        await VIPTickets.sellTicketTo(demoUser.id)
        for (let i = 0; i < 5; i++) {
          await VIPTickets.sellTicketTo(getRandomInt(1, 16))
        }
        for (let i = 0; i < 10; i++) {
          await GATickets.sellTicketTo(getRandomInt(1, 16))
        }
      })
  },

  down: async (queryInterface, Sequelize) => {
    let demoEvent = await Event.findOne({
      where: {
        title: 'Thanksgiving Day Parade'
      }
    })
    let demoUser = await User.findOne({
      where: {
        email: 'demo@user.io'
      }
    })
    const Op = Sequelize.Op;
    let fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    let fakeUserIds = fakeUsers.map(user => user.id)
    fakeUserIds.push(demoUser.id)
    return queryInterface.bulkDelete('SoldTickets',
      {
        userId: { [Op.in]: fakeUserIds }
      }

    )
      .then(() => queryInterface.bulkDelete('Tickets', {
        eventId: { [Op.in]: fakeUserIds }
      }))
  }
};


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
