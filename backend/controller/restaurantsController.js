const { Restaurant } = require("../models/restaurants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;


const createRestaurant = async (
  restaurant_name,
  restaurant_email,
  address_id,
  type_of_dishes,
  delivery_type,
description,
opens_at,
closes_at,
cuisine_type,
phone_number,
delivery_fee,
rating,
password
) => {
  try {
    console.log(restaurant_name)
    const restaurantObject = await Restaurant.create({
      restaurant_name,
      restaurant_email,
      address_id,
      type_of_dishes,
      delivery_type,
    description,
    opens_at,
    closes_at,
    cuisine_type,
    phone_number,
    delivery_fee,
    rating,
    password
    });
    const token = jwt.sign(
        { restaurant_email },
        `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "2h",
        }
      );
      restaurantObject.dataValues.token = token
    return {
      statusCode: 201,
      body: restaurantObject,
    };
  } catch (err) {
    console.log("Error while creating restaurant row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getRestaurant = async (restaurantID) => {
  try {
    const restaurantObject = await Restaurant.findByPk(restaurantID);
    if (restaurantObject !== undefined && restaurantObject !== null) {
      return {
        statusCode: 200,
        body: restaurantObject,
      };
    }
    return {
      statusCode: 404,
      body: "Restaurant Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getRestaurantByCreds = async (restaurant_email) => {
  try {
    const restaurantObject = await Restaurant.findOne({
      where: {
        restaurant_email,
      },
    });
    const token = jwt.sign(
        { restaurant_email },
        `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "2h",
        }
      );
      restaurantObject.dataValues.token = token
    if (restaurantObject !== undefined && restaurantObject !== null) {
      return {
        statusCode: 200,
        body: restaurantObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You are not registered. Please create an account.",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const updateRestaurant = async (id, updateData) => {
  try {
    updateData.password = bcrypt.hashSync(updateData.password,salt);
    console.log(updateData);
    const restaurantObject = await Restaurant.update(updateData, {
      where: { id },
    });
    if (restaurantObject !== undefined && restaurantObject !== null) {
      return {
        statusCode: 200,
        body: restaurantObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllRestaurants = async() => {
    try{
      const restaurantsObject = await Restaurant.findAll();
      const restaurantsArray = [];
      
      restaurantsObject.forEach(element => {
        restaurantsArray.push(element.dataValues)
        
      });
      
      if (restaurantsArray !== undefined && restaurantsArray !== null) {
        return {
          statusCode: 200,
          body: restaurantsArray,
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: err,
      };
    
    }
  }

module.exports = {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  getRestaurantByCreds,
  getAllRestaurants
};