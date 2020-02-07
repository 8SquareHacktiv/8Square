'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Review extends Model { }
  Review.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: { msg: "UserId is required" },
        notEmpty: { msg: "UserId should not be empty" }
      }, allowNull: false
    },
    PlaceId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: { msg: "PlaceId is required" },
        notEmpty: { msg: "PlaceId should not be empty" }
      }, allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "review is required" },
        notEmpty: { msg: "review should not be empty" }
      }, allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: { msg: "rating is required" },
        notEmpty: { msg: "rating should not be empty" }
      }, allowNull: false
    }

  }, { sequelize })
  Review.associate = function (models) {
    // associations can be defined here
    Review.hasMany(models.User, { foreignKey: "id", as: "users" })
    Review.hasMany(models.Place, { foreignKey: "id", as: "places" })
  };
  return Review;
};