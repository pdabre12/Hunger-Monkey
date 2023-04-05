
const {Orders} = require("../models/orders");
const {Op} = require("sequelize");

const createOrder = async (
 
  
  restaurant_email,
  email,
  status,
  price,
  placed_order_time,
  ordered_menu_items,
  delivery_address,
  restaurant_address
  
) => {
  try {
    const orderObject = await Orders.create({
      restaurant_email,
      email,
      status,
      price,
      placed_order_time,
      ordered_menu_items,
      delivery_address,
      restaurant_address
        
    });
    return {
      statusCode: 201,
      body: orderObject,
    };
  } catch (err) {
    console.log("Error while creating order row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getOrder = async (order_id) => {
  try {
    const orderObject = await Orders.findByPk(order_id);
    if (orderObject !== undefined && orderObject !== null) {
      return {
        statusCode: 200,
        body: orderObject,
      };
    }
    return {
      statusCode: 404,
      body: "Order Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllOrders = async () => {
  try {
    const orderObject = await Orders.findAll({
      where:{
        status:{
          [Op.or]: ["Pickup Ready", "Preparing","Cancelled","Placed"]
        }
      }
    });
    if (orderObject !== undefined && orderObject !== null) {
      return {
        statusCode: 200,
        body: orderObject,
      };
    }
    return {
      statusCode: 404,
      body: "Orders Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllOrdersByCredsRestaurant = async (restaurant_email) => {
  try {
    const orderObject = await Orders.findAll({
      where: {
        restaurant_email,
      },
    });
    if (orderObject !== undefined && orderObject !== null && orderObject.length>0) {
      return {
        statusCode: 200,
        body: orderObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any orders available.Please add an order.",
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

const getAllOrdersByCredsUser = async (email) => {
  try {
    const orderObject = await Orders.findAll({
      where: {
        email,
      },
    });
    if (orderObject !== undefined && orderObject !== null && orderObject.length>0) {
      return {
        statusCode: 200,
        body: orderObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any orders available.Please add an order.",
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

const getAllOrdersByCredsDeliveryPerson = async (deliveryPerson_email) => {
  try {
    const orderObject = await Orders.findAll({
      where: {
        deliveryPerson_email,
      },
    });
    if (orderObject !== undefined && orderObject !== null && orderObject.length>0) {
      return {
        statusCode: 200,
        body: orderObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any orders available.Please add an order.",
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

const updateOrder = async (order_id, updateData) => {
  try {
    const updateObject = await Orders.update(updateData, {
      where: { order_id, },
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

const deleteOrder = async(order_id) =>{
    try{
        const deletedObject = await Orders.destroy({
            where:{order_id,}
        })
        console.log(deletedObject)
        if(deletedObject!==undefined && deletedObject!==null && deletedObject!==0){
            return {
                statusCode:200,
                message:"Order deleted successfully"
            };
        }
        else if (deletedObject===0){
          return {
            statusCode:404,
            message:"Unable to delete order item.Order not found."
          }

        }
    }
    catch(err){
        return {
            statusCode: 500,
            body: err,
          };

    }
}

module.exports = {
  createOrder,
  getAllOrdersByCredsDeliveryPerson,
  getAllOrdersByCredsRestaurant,
  getAllOrdersByCredsUser,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders
};