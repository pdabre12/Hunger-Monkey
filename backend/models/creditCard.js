const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");

const DT = Sequelize.DataTypes;

const CreditCard = sequelize.define("creditCard", {
  creditCard_ID: {
    type: DT.INTEGER,
    allowNull: false,
    primaryKey: true,
    auto_increment:true
  },
  email: {
    type: DT.STRING(60),
    allowNull:false // 'id' refers to column name in paymentInfo table
    }
,
  address_id: {
    type: DT.INTEGER,
    allowNull:false
},
  name : {
    type: DT.STRING(50),
    allowNull: false,
  },
  expiry_date: {
    type: DT.DATEONLY,
    allowNull: false,
  },
});

CreditCard.sync();


module.exports = {
  CreditCard,
};