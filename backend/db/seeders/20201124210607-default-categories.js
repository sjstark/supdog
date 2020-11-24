'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const categories = [
      'Auto, Boat, & Air',
      'Business & Professional',
      'Charity & Causes',
      'Community & Culture',
      'Family & Education',
      'Fashion & Beauty',
      'Film, Media, & Entertainment',
      'Food & Drink',
      'Government & Politics',
      'Health & Wellness',
      'Hobbies & Special Interest',
      'Home & Lifestyle',
      'Music',
      'Other',
      'Performing & Visual Arts',
      'Religion & Spirituality',
      'School Activities',
      'Science & Technology',
      'Seasonal & Holiday',
      'Sports & Fitness',
      'Travel & Outdoor'
    ]

    const categoryObjects = categories.map(category => {
      return {
        title: category
      }
    })

    return queryInterface.bulkInsert('Categories', categoryObjects)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
