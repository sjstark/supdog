'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
    organizer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventPicURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 256]
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 120]
      }
    },
    about: {
      type: DataTypes.TEXT
    },
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.User, {
      foreignKey: 'organizer'
    })
  };
  return Event;
};
