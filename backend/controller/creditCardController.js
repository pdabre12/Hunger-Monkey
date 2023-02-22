
const {CreditCard} = require("../models/creditCard");

const createCreditCard = async (
 
  email,
  address_id,
  name,
  expiry_date,
  
) => {
  try {
    const creditCardObject = await CreditCard.create({
        email,
        address_id,
        name,
        expiry_date,
    });
    return {
      statusCode: 201,
      body: creditCardObject,
    };
  } catch (err) {
    console.log("Error while creating creditCard row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getCreditCard = async (creditCard_ID) => {
  try {
    const creditCardObject = await CreditCard.findByPk(creditCard_ID);
    if (creditCardObject !== undefined && creditCardObject !== null) {
      return {
        statusCode: 200,
        body: creditCardObject,
      };
    }
    return {
      statusCode: 404,
      body: "Credit Card Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllCreditCardsByCreds = async (email) => {
  try {
    const creditCardObject = await CreditCard.findAll({
      where: {
        email,
      },
    });
    if (creditCardObject !== undefined && creditCardObject !== null && creditCardObject.length>0) {
      return {
        statusCode: 200,
        body: creditCardObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any credit cards stored.Please store a credit card.",
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

const updateCreditCard = async (creditCard_ID, updateData) => {
  try {
    const updateObject = await CreditCard.update(updateData, {
      where: { creditCard_ID, },
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
  createCreditCard,
  getCreditCard,
  getAllCreditCardsByCreds,
  updateCreditCard,
};