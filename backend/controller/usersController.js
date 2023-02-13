const { User } = require("../models/users");
const { Restaurant } = require("../models/restaurants");
const {Menu } = require("../models/menu");
const {Orders} = require("../models/orders");

const createUser = async (
  
  firstName,
  lastName,
  phoneNumber,
  user_email,
  password,
  address_id,
  user_gender,
  creditCard_ID,
  role,
  
) => {
  try {
    let userCredentials = {
      firstName,
      lastName,
      phoneNumber,
      user_email,
      password,
      address_id,
      user_gender,
      creditCard_ID,
      role,

    }
    const userObject = await User.create(userCredentials);
    
    return {
      statusCode: 201,
      body: userObject,
    };
  } catch (err) {
    console.log("Error while creating user row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getUser = async (email) => {
  try {
    const userObject = await User.findByPk(email);
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    }
    return {
      statusCode: 404,
      body: "User Unauthorized",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getUserByCreds = async (email) => {
  try {
    const userObject = await User.findOne({
      where: { user_email: email }
    });
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
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

const updateUser = async (email, updateData) => {
  try {
    const updateObject = await User.update(updateData, {
      where: { user_email: email },
    });
    if (updateObject !== undefined && updateObject !== null) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
};