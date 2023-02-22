const { Address } = require("../models/address");

const createAddress = async (
 
  email,
  street,
  city,
  state,
  country,
  pincode
) => {
  try {
    const addressObject = await Address.create({
        email,
        street,
        city,
        state,
        country,
        pincode
    });
    return {
      statusCode: 201,
      body: addressObject,
    };
  } catch (err) {
    console.log("Error while creating address row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAddress = async (addressID) => {
  try {
    const addressObject = await Address.findByPk(addressID);
    if (addressObject !== undefined && addressObject !== null) {
      return {
        statusCode: 200,
        body: addressObject,
      };
    }
    return {
      statusCode: 404,
      body: "Address Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllAddressByCreds = async (email) => {
  try {
    const addressObject = await Address.findAll({
      where: {
        email,
      },
    });
    if (addressObject !== undefined && addressObject !== null && addressObject.length>0) {
      return {
        statusCode: 200,
        body: addressObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any addresses created.Please create an address.",
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

const updateAddress = async (addressID, updateData) => {
  try {
    const updateObject = await Address.update(updateData, {
      where: { address_id: addressID },
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
  createAddress,
  getAddress,
  getAllAddressByCreds,
  updateAddress,
};