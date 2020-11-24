'use strict';

const { Event, User } = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let demoEvent = Event.findOne({
      where: {
        title: 'Thanksgiving Day Parade'
      }
    })
    return queryInterface.bulkInsert('Tickets', [
      {
        eventId: demoEvent.id,
        name: 'General Admission',
        quantity: 50,
        sold: 5,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    let demoEvent = Event.findOne({
      where: {
        title: 'Thanksgiving Day Parade'
      }
    })
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Tickets', {
      eventId: { [Op.in]: [demoEvent.id] }
    })
  }
};
