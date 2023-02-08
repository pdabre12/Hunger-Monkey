const Sequelize = require("sequelize");
const sequelize = require("./config");

const DT = Sequelize.DataTypes;

const Address = sequelize.define("address", {
  address_id: {
    type: DT.UUID,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DT.UUID,
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