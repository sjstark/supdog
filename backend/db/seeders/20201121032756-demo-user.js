'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

let fakeUsers = [];
for (let i = 1; i <= 15; i++) {
  let randomNum = getRandomInt(1, 100)
  let randomGender = getRandomInt(-1, 1)
  fakeUsers.push({
    email: faker.internet.email(),
    username: `FakeUser${i}`,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profilePicURL: `https://randomuser.me/api/portraits/thumb/${randomGender ? 'men' : 'women'}/${randomNum}.jpg`,
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

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
      ...fakeUsers
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', ...fakeUsers.map(user => { user.username })] }
    }, {});
  }
};
