'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING(60),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
      .then(() => queryInterface.addColumn('Events', 'categoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        }
      }))
      .then(() => queryInterface.addIndex('Events', ['categoryId']));
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Events', 'categoryId'),
      queryInterface.dropTable('Categories')
    ]);
  }
};
