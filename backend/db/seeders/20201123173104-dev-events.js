'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        title: 'Thanksgiving Day Parade',
        organizerId: 1,
        eventPicURL: "https://supdog-hosting.s3.us-east-2.amazonaws.com/parade.jpeg",
        summary: "Join us for one of the longest Thanksgiving Day traditions!",
        about: "In 1924, Macy’s founded the first New York Thanksgiving Parade (to celebrate both Thanksgiving and Christmas.). Since then, the parade has experienced almost 100 years of history – from floats to special guests, to unforeseen incidents). Tonight, follow the history of New York through the history of the parade. ",
      },
      {
        title: 'Johnson Family Reunion',
        organizerId: 2,
        summary: "Our Annual Family Reunion!"
      },
      {
        title: 'Christmas Tree Lighting',
        organizerId: 3,
        summary: "The yearly Arlington Tree Lighting!",
        about: "Come join us Friday evening for a spectacular event. The symphony will join us for Christmas carols as we light the 36-foot tree in Arlington Plaza!"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      organizerId: { [Op.in]: [0, 1, 2] }
    })
  }
};
