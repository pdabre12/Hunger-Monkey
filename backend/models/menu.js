const Sequelize = require("sequelize");
const sequelize = require("./config");
const { Restaurant } = require("./restaurants");

const DT = Sequelize.DataTypes;

const Menu = sequelize.define("menus", {
  menu_id: {
    type: DT.UUID,
    allowNull: false,
    primaryKey: true,
  },
  restaurant_id: {
        type: DT.UUID,
        references: {
           model: Restaurant, // 'address' refers to table name
           key: 'restaurant_id', // 'id' refers to column name in address table
        }
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