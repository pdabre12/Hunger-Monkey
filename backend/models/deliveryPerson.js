const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./configSequelize");
const { Address } = require("./address");
const { CreditCard } = require("./creditCard");

const DT = Sequelize.DataTypes;
const salt = 10;

const DeliveryPerson = sequelize.define(
  "deliveryPerson",
  {
    deliveryPerson_ID: {
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
    email: {
      type: DT.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DT.STRING(200),
      allowNull: false,
    },
    address_id: {
        type: DT.UUID,
        references: {
           model: Address, // 'address' refers to table name
           key: 'address_id', // 'id' refers to column name in address table
        }
     },
    creditCard_ID: {
        type: DT.UUID,
        references: {
           model: CreditCard, // 'paymentInfo' refers to table name
           key: 'creditCard_ID', // 'id' refers to column name in paymentInfo table
        }
    },
  },
  {
    hooks: {
      beforeCreate: (DeliveryPerson) => {
        DeliveryPerson.password =
          DeliveryPerson.password !== "" ? bcrypt.hashSync(DeliveryPerson.password, salt) : "";
      },
    },
  }
);

DeliveryPerson.sync();

module.exports = {
  DeliveryPerson,
};