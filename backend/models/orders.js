const Sequelize = require("sequelize");
const { Address } = require("./address");
const sequelize = require("./configSequelize");
const { DeliveryPerson } = require("./deliveryPerson");
const { Restaurant } = require("./restaurants");
const { User } = require("./users");

const DT = Sequelize.DataTypes;

const Orders = sequelize.define("orders", {
  order_id: {
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
  user_id: {
    type: DT.UUID,
        references: {
           model: User, // 'address' refers to table name
           key: 'user_id', // 'id' refers to column name in address table
        }
  },
  deliveryPerson_ID: {
    type: DT.UUID,
        references: {
           model: DeliveryPerson, // 'address' refers to table name
           key: 'deliveryPerson_ID', // 'id' refers to column name in address table
        }
  },
  status: {
    type: DT.STRING(10),
    allowNull: false,
  },
  price: {
    type: DT.INTEGER,
    allowNull: false,
  },
  placed_order_time:{
    type: DT.TIME,
    allowNull:false
  },
  order_delivered_time:{
    type: DT.TIME,
    allowNull:false
  },
  ordered_menu_items:{
    type:DT.JSON,
    allowNull:false
  },
  delivery_address_id : {
        type: DT.UUID,
        references: {
           model: Address, // 'address' refers to table name
           key: 'address_id', // 'id' refers to column name in address table
        }
     }
})

Orders.sync();

module.exports = {
  Orders,
};