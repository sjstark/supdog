'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicURL: 'https://supdog-hosting.s3.us-east-2.amazonaws.com/Demolition.jpg'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
