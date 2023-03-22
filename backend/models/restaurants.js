const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");
const bcrypt = require("bcrypt");
const salt = 10;

const DT = Sequelize.DataTypes;

const Restaurant = sequelize.define(
  "restaurants",
  {
    restaurant_name:{
      type:DT.STRING(60),
      allowNull:false
    },
    description: {
      type: DT.STRING(100),
      allowNull: false,
    },
    restaurant_email: {
        type: DT.STRING(50),
        allowNull: false,
        primary_key:true
      },
    opens_at: {
      type: DT.TIME,
      allowNull: false,
    },
    closes_at: {
      type: DT.TIME,
      allowNull: false,
    },
    cuisine_type: {
      type: DT.STRING(200),
      allowNull: false,
    },
  
    delivery_type: {
      type: DT.STRING(50),
      allowNull: false
    },
    phone_number: {
        type: DT.INTEGER,
        allowNull: false,
    },
    delivery_fee :{
        type:DT.INTEGER,
        allowNull: false,

    },
    address_id:{
      type: Sequelize.INTEGER,
  },
    password: {
        type: DT.STRING(200),
        allowNull: false,
    },
    type_of_dishes:{
      type:DT.STRING(50),
      allowNull:false
    },
    rating:{
      type:DT.INTEGER,
      allowNull:true
      
    },
    restaurant_dp:{
      type:DT.STRING(100),
      allowNull:false
    }
  },
  {
    hooks: {
      beforeCreate: (Restaurant) => {
        Restaurant.password =
          Restaurant.password !== "" ? bcrypt.hashSync(Restaurant.password, salt) : "";
      },
    }}
);

Restaurant.sync();

module.exports = {
  Restaurant,
};