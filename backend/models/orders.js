const Sequelize = require("sequelize");
const { Address } = require("./address");
const sequelize = require("./configSequelize");
const { Restaurant } = require("./restaurants");
const { User } = require("./users");

const DT = Sequelize.DataTypes;

const Orders = sequelize.define("orders", {
  order_id: {
    type: DT.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true
  },
  restaurant_email: {
        type: DT.STRING(50),
        allowNull:false
},
  email: {
    type: DT.STRING(60),
        allowNull:false
  },
  deliveryPerson_email: {
    type: DT.STRING(50),
        allowNull:true
  },
  status: {
    type: DT.STRING(50),
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
    type: DT.TIME
  },
  ordered_menu_items:{
    type:DT.JSON,
    allowNull:false
  },
  delivery_address : {
        type: DT.STRING(100),
        allowNull:false
      
     },
     restaurant_address:{
      type: DT.STRING(100),
        allowNull:false
     },
     stripe_paymentIntent_id:{
      type:DT.STRING(200),
      allowNull:true

     }
})

Orders.sync({alter:true});

module.exports = {
  Orders,
};