'use strict';

const randomHexColor = require('random-hex-color')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [
      ['Auto, Boat, & Air', 'fas fa-tachometer-alt', randomHexColor()],
      ['Business & Professional', 'fas fa-piggy-bank', randomHexColor()],
      ['Charity & Causes', 'fas fa-hand-holding-heart', randomHexColor()],
      ['Community & Culture', 'fas fa-users', randomHexColor()],
      ['Family & Education', 'fas fa-apple-alt', randomHexColor()],
      ['Fashion & Beauty', 'fas fa-tshirt', randomHexColor()],
      ['Film, Media, & Entertainment', 'fas fa-video', randomHexColor()],
      ['Food & Drink', 'fas fa-utensils', randomHexColor()],
      ['Government & Politics', 'fas fa-handshake', randomHexColor()],
      ['Health & Wellness', 'fas fa-heart', randomHexColor()],
      ['Hobbies & Special Interest', 'fas fa-hammer', randomHexColor()],
      ['Home & Lifestyle', 'fas fa-home', randomHexColor()],
      ['Music', 'fas fa-music', randomHexColor()],
      ['Other', 'fas fa-question', randomHexColor()],
      ['Performing & Visual Arts', 'fas fa-theater-masks', randomHexColor()],
      ['Religion & Spirituality', 'fas fa-dove', randomHexColor()],
      ['School Activities', 'fas fa-graduation-cap', randomHexColor()],
      ['Science & Technology', 'fas fa-microscope', randomHexColor()],
      ['Seasonal & Holiday', 'fas fa-snowman', randomHexColor()],
      ['Sports & Fitness', 'fas fa-running', randomHexColor()],
      ['Travel & Outdoor', 'fas fa-plane-departure', randomHexColor()],
    ]

    const categoryObjects = categories.map(category => {
      return {
        title: category[0],
        icon: category[1],
        color: category[2]
      }
    })

    return queryInterface.bulkInsert('Categories', categoryObjects)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
