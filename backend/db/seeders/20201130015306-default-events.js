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
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    let categorySearch = await Category.findAll()
    categorySearch.forEach(category => {
      categories[category.title] = category.id
    })

    return queryInterface.bulkInsert('Events', [
      {
        title: 'Thanksgiving Day Parade',
        organizerId: demoUser.id,
        eventPicURL: "https://supdog-hosting.s3.us-east-2.amazonaws.com/parade.jpeg",
        summary: "Join us for one of the longest Thanksgiving Day traditions!",
        about: "In 1924, Macy’s founded the first New York Thanksgiving Parade (to celebrate both Thanksgiving and Christmas.). Since then, the parade has experienced almost 100 years of history – from floats to special guests, to unforeseen incidents). Tonight, follow the history of New York through the history of the parade. ",
        categoryId: categories['Seasonal & Holiday']
      },
      {
        title: 'Johnson Family Reunion',
        organizerId: demoUser.id,
        eventPicURL: await getImage(1000, 500) || null,
        summary: "Our Annual Family Reunion!",
        about: faker.lorem.paragraphs(),
        categoryId: categories['Family & Education']
      },
      {
        title: 'Christmas Tree Lighting',
        organizerId: demoUser.id,
        eventPicURL: await getImage(1000, 500) || null,
        summary: "The yearly Arlington Tree Lighting!",
        about: "Come join us Friday evening for a spectacular event. The symphony will join us for Christmas carols as we light the 36-foot tree in Arlington Plaza!",
        categoryId: categories['Seasonal & Holiday']

      }
    ])
    .then(async () => {
      fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
      fakeUserIds = fakeUsers.map(user => user.id)
      console.log('Creating fakeEvents Array For: Music')
      for (let i = 0; i < 20; i++) {
        fakeEvents.push(
          {
            title: `${faker.random.word(2)} Concert`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Music']
          }
        )
      }
      console.log('fakeEvents Array Created!')
    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Auto, Boat, & Air')
      for (let i = 0; i < 10; i++) {
        fakeEvents.push(
          {
            title: `${faker.vehicle.manufacturer()} Auto Show`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Auto, Boat, & Air']
          }
        )
      }
      console.log('fakeEvents Array Created!')
    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Charity & Causes')
      for (let i = 0; i < 3; i++) {
        fakeEvents.push(
          {
            title: `${faker.company.companyName()} Volunteer Day`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Charity & Causes']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Business & Professional')
      for (let i = 0; i < 8; i++) {
        fakeEvents.push(
          {
            title: `${faker.company.companyName()} Conference`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.company.catchPhrase(),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Business & Professional']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Community & Culture')
      for (let i = 0; i < 6; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} Gathering`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Community & Culture']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Family & Education')
      for (let i = 0; i < 3; i++) {
        fakeEvents.push(
          {
            title: `${faker.name.lastName()} Family Reunion`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Family & Education']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Fashion & Beauty')
      for (let i = 0; i < 14; i++) {
        fakeEvents.push(
          {
            title: `${faker.commerce.product()} Beauty Show`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Fashion & Beauty']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Film, Media, & Entertainment')
      for (let i = 0; i < 12; i++) {
        fakeEvents.push(
          {
            title: `${faker.random.words(3)} Movie Showing`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Film, Media, & Entertainment']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Food & Drink')
      for (let i = 0; i < 17; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} Food Fair`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Food & Drink']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Health & Wellness')
      for (let i = 0; i < 14; i++) {
        fakeEvents.push(
          {
            title: `${faker.name.firstName()} Leads Yoga`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Health & Wellness']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Government & Politics')
      for (let i = 0; i < 26; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} City Council Meeting`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Government & Politics']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Home & Lifestyle')
      for (let i = 0; i < 3; i++) {
        fakeEvents.push(
          {
            title: `Arts and Crafts with ${faker.name.findName()}`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Home & Lifestyle']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Other')
      for (let i = 0; i < 6; i++) {
        fakeEvents.push(
          {
            title: `${faker.random.words(4)}`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Other']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Performing & Visual Arts')
      for (let i = 0; i < 10; i++) {
        fakeEvents.push(
          {
            title: `${faker.random.word()} Art Showing`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Performing & Visual Arts']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Religion & Spirituality')
      for (let i = 0; i < 12; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} Church Gathering`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Religion & Spirituality']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: School Activities')
      for (let i = 0; i < 6; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} High School Graduation`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['School Activities']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Science & Technology')
      for (let i = 0; i < 13; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} Science Museum Show`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Science & Technology']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Seasonal & Holiday')
      for (let i = 0; i < 7; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} Holiday Parade`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Seasonal & Holiday']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Sports & Fitness')
      for (let i = 0; i < 24; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.city()} vs. ${faker.address.city()} Game`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Sports & Fitness']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })

    .then(async () => {
      console.log('Creating fakeEvents Array For: Travel & Outdoor')
      for (let i = 0; i < 2; i++) {
        fakeEvents.push(
          {
            title: `${faker.address.state()} River Adventure`.slice(0,50),
            organizerId: seederUtils.selectRandom(fakeUserIds),
            eventPicURL: await getImage(1000, 500) || null,
            summary: faker.lorem.sentence().slice(0,120),
            about: faker.lorem.paragraphs(),
            categoryId: categories['Travel & Outdoor']
          }
        )
      }
      console.log('fakeEvents Array Created!')

    })
    .then(() => {
      console.log('Shuffling fakeEvents')

      var shuffle = function (array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;

      };

      fakeEvents = shuffle(fakeEvents)
      console.log('Events Shuffled')
    })
    .then(async () =>{
      console.log('Inserting All fakeEvents into Database')
      createdEvents = await queryInterface.bulkInsert('Events', fakeEvents)
      console.log('Insertion Complete')
      console.log('Events Seeding Complete!')
    })
    .catch(err => {
      console.error(err)
    })
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    fakeUsers = await User.findAll({ where: { username: { [Op.startsWith]: 'FakeUser' } } })
    fakeUserIds = fakeUsers.map(user => user.id)
    demoUser = await User.findOne({where: {email: 'demo@user.io'}})

    return queryInterface.bulkDelete('Events', {
      organizerId: { [Op.in]: [...fakeUserIds, demoUser.id] }
    })
  }
};
