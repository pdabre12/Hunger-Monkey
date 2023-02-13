const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");

const DT = Sequelize.DataTypes;

const Address = sequelize.define("address", {
  address_id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  email: {
      type: DT.STRING(50),
      allowNull:false
},
  street: {
    type: DT.STRING(100),
    allowNull: false,
  },
  city: {
    type: DT.STRING(50),
    allowNull: false,
  },
  state: {
    type: DT.STRING(50),
    allowNull: false,
  },
  country:{
    type: DT.STRING(50),
    allowNull:false
  },
  pincode :{
    type:DT.INTEGER,
    allowNull:false
  }
})

Address.sync();

module.exports = {
  Address,
};