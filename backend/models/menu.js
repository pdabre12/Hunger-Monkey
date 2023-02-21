const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");
const { Restaurant } = require("./restaurants");

const DT = Sequelize.DataTypes;

const Menu = sequelize.define("menus", {
  menu_id: {
    type: DT.UUID,
    allowNull: false,
    primaryKey: true,
  },
  restaurant_email: {
        type: DT.STRING(60),
        allowNull:false
},
  description: {
    type: DT.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DT.INTEGER,
    allowNull: false,
  },
  price: {
    type: DT.INTEGER,
    allowNull: false,
  },
  availability:{
    type: DT.BOOLEAN,
    allowNull:false
  },
 
})

Menu.sync();

module.exports = {
  Menu,
};