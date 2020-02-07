'use strict';
const hashPassword = require("../helpers/hashPassword")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Username should not be empty" },
        notNull: { msg: "Username is required" },
        min: {
          args: 6,
          msg: "minimal character for username is 6"
        }
      }, allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password should not be empty" }
      }, allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Email is invalid" },
        isUnique(value) {
          return User.findAll({ where: { email: value } })
            .then(userFound => {
              if (userFound.length > 0) {
                throw new Error(`email ${value} is already registered`)
              }
            })
        },
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email should not be empty" }
      }, allowNull: false
    }

  }, {
      hooks: {
        beforeCreate: (instance, options) => {
          let hashed = hashPassword(instance.password)
          instance.password = hashed
        }
      }, sequelize
    })

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Place, { through: "Reviews", foreignKey: "UserId", as: "users" })
  };
  return User;
};