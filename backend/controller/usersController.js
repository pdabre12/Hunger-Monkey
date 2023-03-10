const { User } = require("../models/users");
const { Restaurant } = require("../models/restaurants");
const {Menu } = require("../models/menu");
const {Orders} = require("../models/orders");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

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
    const token = jwt.sign(
      { user_email },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: "2h",
      }
    );
    userObject.dataValues.token = token
    
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
      body: "UserID Not present",
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
    const token = jwt.sign(
      { email },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: "2h",
      }
    );
    
    if (userObject !== undefined && userObject !== null) {
      userObject.dataValues.token = token
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

const updateUser = async (userID, updateData) => {
  try {
    updateData.password = bcrypt.hashSync(updateData.password,salt);
    console.log(updateData);
    const updateObject = await User.update(updateData, {
      where: { id: userID },
      
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

const getAllUsers = async() => {
  try{
    const usersObject = await User.findAll();
    const usersArray = [];
    // console.log(usersArray,usersObject[0].dataValues)
    
    usersObject.forEach(element => {
      usersArray.push(element.dataValues)
      
    });
    console.log(usersArray)
    
    if (usersArray !== undefined && usersArray !== null) {
      return {
        statusCode: 200,
        body: usersArray,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  
  }
}

// const deleteUser = async (userID) => {
//   try {
//     const updateObject = await User.delete(updateData, {
//       where: { id: userID },
//     });
//     if (updateObject !== undefined && updateObject !== null) {
//       return {
//         statusCode: 200,
//         body: updateObject,
//       };
//     }
//   } catch (err) {
//     return {
//       statusCode: 500,
//       body: err,
//     };
//   }
// };

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
  getAllUsers
};