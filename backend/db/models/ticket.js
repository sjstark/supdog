'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    string: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: this.quantity
      }
    },
  }, {});
  Ticket.associate = function (models) {
    Ticket.belongsTo(models.Event, {
      foreignKey: "eventId"
    })
  };
  return Ticket;
};
