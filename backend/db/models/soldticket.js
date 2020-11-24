'use strict';

const Ticket = require('./index')

module.exports = (sequelize, DataTypes) => {
  const SoldTicket = sequelize.define('SoldTicket', {
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  SoldTicket.associate = function (models) {
    SoldTicket.belongsTo(models.Ticket, {
      foreignKey: 'ticketId'
    })
    SoldTicket.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };

  return SoldTicket;
};
