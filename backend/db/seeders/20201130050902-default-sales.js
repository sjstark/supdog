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

module.exports = {
  up: async (queryInterface, Sequelize) => {
    fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    fakeUserIds = fakeUsers.map(user => user.id)
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    fakeUserIds = [...fakeUserIds, demoUser.id]

    console.log('Creating Ticket sales')
    let tickets = await Ticket.findAll({
    })

    let soldTickets = []
    tickets.forEach(async ticket => {

      let randomNum = seederUtils.getRandomInt(5, ticket.quantity)
      for( let j = 0; j < randomNum; j++) {
        let userId = seederUtils.selectRandom(fakeUserIds)
        soldTickets.push({
          ticketId: ticket.id,
          userId: userId
        })
        await ticket.increment('sold')
      }
    })

    return queryInterface.bulkInsert('SoldTickets', soldTickets)
    .then(() => console.log('Ticket Sales Complete!'))

  },

  down: async (queryInterface, Sequelize) => {
    fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    fakeUserIds = fakeUsers.map(user => user.id)
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    fakeUserIds = [...fakeUserIds, demoUser.id]

    return queryInterface.bulkDelete('SoldTickets', {
      userId: { [Op.in]: fakeUserIds}
    })
  }
};
