'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventDate = sequelize.define('EventDate', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: DataTypes.DATE
  }, {});
  EventDate.associate = function (models) {
    EventDate.belongsTo(models.Event, {
      foreignKey: 'eventId'
    })
  };
  return EventDate;
};
