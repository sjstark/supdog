'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
  }, {});
  Category.associate = function (models) {
    Category.hasMany(models.Event, {
      foreignKey: 'categoryId'
    })
  };
  return Category;
};
