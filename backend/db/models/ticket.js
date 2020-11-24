'use strict';

const { SoldTicket }

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
    sold: {
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
    Ticket.hasMany(models.SoldTicket, {
      as: 'soldTickets',
      foreignKey: "ticketId"
    })
  };

  //
  // ─── TICKET PROTOTYPE METHOD ────────────────────────────────────────────────────
  //

  Ticket.prototype.sellTicketTo = async function (userId) {
    if (this.sold >= this.quantity) return false
    const soldTicket = await SoldTicket.create({
      ticketId: this.id,
      userId: userId
    })
    this.sold++
    await this.save()
    return soldTicket
  }


  return Ticket;
};
