const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");
const { Restaurant } = require("./restaurants");

const DT = Sequelize.DataTypes;

const Menu = sequelize.define("menus", {
  menu_id: {
    type: DT.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true,
  },
  restaurant_email: {
        type: DT.STRING(60),
        allowNull:false
},
dish_name:{
  type:DT.STRING(50),
  allowNull:false
},
  description: {
    type: DT.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DT.INTEGER,
    allowNull: true,
  },
  price: {
    type: DT.INTEGER,
    allowNull: false,
  },
  availability:{
    type: DT.BOOLEAN,
    allowNull:false
  },
  cuisine:{
    type:DT.STRING(50),
    allowNull:false
  },
  food_type:{
    type:DT.STRING(20),
    allowNull:false
  }
 
})

Menu.sync();

module.exports = {
  Menu,
};