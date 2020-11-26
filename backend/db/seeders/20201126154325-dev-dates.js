'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const dates = [
      { eventId: 1, start: new Date('26 Nov 2020 12:00:00 EST'), end: new Date('26 Nov 2020 15:00:00 EST') },
      { eventId: 2, start: new Date('08 Dec 2020 09:30:00 EST'), end: new Date('08 Dec 2020 13:15:00 EST') },
      { eventId: 2, start: new Date('20 May 2021 09:30:00 EST'), end: new Date('20 May 2021 13:15:00 EST') },
      { eventId: 3, start: new Date('01 Dec 2020 20:00:00 EST'), end: new Date('26 Dec 2020 00:00:00 EST') },
    ]

    return queryInterface.bulkInsert('EventDates', dates)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventDates', null, {})
  }
};
