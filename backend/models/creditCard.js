const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const CreditCard = sequelize.define("creditCard", {
  creditCard_ID: {
    type: DT.UUID,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DT.UUID,
    allowNull:false
},
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