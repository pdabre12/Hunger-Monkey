const Sequelize = require("sequelize");
const sequelize = require("./config");
const { Address } = require("./address");

const DT = Sequelize.DataTypes;

const Restaurant = sequelize.define(
  "restaurants",
  {
    restaurant_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    restaurant_email: {
      type: DT.STRING(50),
      allowNull: false,
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
    address_id: {
        type: DT.UUID,
        references: {
           model: Address, // 'address' refers to table name
           key: 'address_id', // 'id' refers to column name in address table
        }
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