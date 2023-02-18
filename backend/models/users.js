const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./configSequelize");
const { Address } = require("./address");
const { CreditCard } = require("./creditCard");

const DT = Sequelize.DataTypes;
const salt = 10;

const User = sequelize.define(
  "users",
  {
   
    firstName: {
      type: DT.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DT.STRING(50),
      allowNull: false,
    },
    phoneNumber: {
      type: DT.STRING(50),
      allowNull: false,
    },
    user_email: {
      type: DT.STRING(50),
      allowNull: false,
      primary_key:true
    },
    password: {
      type: DT.STRING(200),
      allowNull: false,
    },
  
    user_gender: {
      type: DT.STRING(50),
      allowNull: false
    },
    
    role:{
      type:DT.STRING(20),
      allowNull:true
    }
  },
  {
    hooks: {
      beforeCreate: (User) => {
        User.password =
          User.password !== "" ? bcrypt.hashSync(User.password, salt) : "";
      },
    },
  }
);

User.sync();

module.exports = {
  User,
};