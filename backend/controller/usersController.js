const { User } = require("../models/users");
const { Restaurant } = require("../models/restaurants");
const {Menu } = require("../models/menu");
const {Orders} = require("../models/orders");
const jwt = require("jsonwebtoken");
const salt = 10;

const createUser = async (
  
  firstName,
  lastName,
  phoneNumber,
  user_email,
  password,
  user_gender,
  role,
  address,
  city,
  zipcode
  
) => {
  try {
    let userCredentials = {
      firstName,
      lastName,
      phoneNumber,
      user_email,
      password,
      user_gender,
      role,
      address,
    city,
    zipcode

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
    const userObject = await User.findOne({
      where: { user_email: email }
    });
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    }
    return {
      statusCode: 404,
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

const updateUser = async (email, updateData) => {
  try {
    // console.log(updateData.password);
    // updateData.password = bcrypt.hashSync(updateData.password,salt);
    console.log(updateData);
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