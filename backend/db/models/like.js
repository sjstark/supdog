'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.Event, {
      foreignKey: 'eventId'
    })
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Like;
};
