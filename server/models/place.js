'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Place extends Model { }
  Place.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "review is required" },
        notEmpty: { msg: "review should not be empty" }
      }, allowNull: false
    },
    idAPI: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "review is required" },
        notEmpty: { msg: "review should not be empty" }
      }, allowNull: false
    }
  }, { sequelize })
  Place.associate = function (models) {
    // associations can be defined here
    Place.belongsToMany(models.User, { through: models.Review })
  };
  return Place;
};