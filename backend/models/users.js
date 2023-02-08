const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./config");
const { Address } = require("./address");
const { CreditCard } = require("./creditCard");

const DT = Sequelize.DataTypes;
const salt = 10;

const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
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
      unique: true,
    },
    password: {
      type: DT.STRING(200),
      allowNull: false,
    },
    address_id: {
        type: DT.INTEGER,
        references: {
           model: Address, // 'address' refers to table name
           key: 'address_id', // 'id' refers to column name in address table
        }
     },
    user_gender: {
      type: DT.STRING(50),
      allowNull: false
    },
    creditCard_ID: {
        type: DT.INTEGER,
        references: {
           model: CreditCard, // 'paymentInfo' refers to table name
           key: 'creditCard_ID', // 'id' refers to column name in paymentInfo table
        }
    },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        User.password =
          User.password !== "" ? bcrypt.hashSync(User.password, salt) : "";
      },
    },
  }
);

User.sync({alter:true});

module.exports = {
  User,
};