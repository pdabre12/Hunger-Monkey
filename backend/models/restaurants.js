const Sequelize = require("sequelize");
const sequelize = require("./configSequelize");
const { Address } = require("./address");

const DT = Sequelize.DataTypes;

const Restaurant = sequelize.define(
  "restaurants",
  {
    
    restaurant_email: {
      type: DT.STRING(50),
      allowNull: false,
      primary_key:true
    },
    description: {
      type: DT.STRING(100),
      allowNull: false,
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
    rating:{
        type:DT.INTEGER,
        allowNull: false,
    },
    password: {
        type: DT.STRING(200),
        allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: (Restaurant) => {
        Restaurant.password =
          Restaurant.password !== "" ? bcrypt.hashSync(Restaurant.password, salt) : "";
      },
    },
  }
);

Restaurant.sync();

module.exports = {
  Restaurant,
};