
const {Orders} = require("../models/orders");

const createOrder = async (
 
  
  restaurant_email,
  email,
  status,
  price,
  availability,
  cuisine
  
) => {
  try {
    const orderObject = await Orders.create({
        restaurant_email,
        description,
        rating,
        price,
        availability,
        cuisine
        
    });
    return {
      statusCode: 201,
      body: menuObject,
    };
  } catch (err) {
    console.log("Error while creating menu row: ", err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getMenu = async (menu_id) => {
  try {
    const menuObject = await Menu.findByPk(menu_id);
    if (menuObject !== undefined && menuObject !== null) {
      return {
        statusCode: 200,
        body: menuObject,
      };
    }
    return {
      statusCode: 404,
      body: "Menu Not found",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getAllMenusByCreds = async (restaurant_email) => {
  try {
    const menuObject = await Menu.findAll({
      where: {
        restaurant_email,
      },
    });
    if (menuObject !== undefined && menuObject !== null && menuObject.length>0) {
      return {
        statusCode: 200,
        body: menuObject,
      };
    } else {
      return {
        statusCode: 404,
        body: "You do not have any menus available.Please add a menu.",
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

const updateMenu = async (menu_id, updateData) => {
  try {
    const updateObject = await Menu.update(updateData, {
      where: { menu_id, },
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

const deleteMenu = async(menu_id) =>{
    try{
        const deletedObject = await Menu.destroy({
            where:{menu_id,}
        })
        if(deletedObject!==undefined && deletedObject!==null){
            return {
                statusCode:200,
                message:"Menu Item deleted successfully"
            };
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
  createMenu,
  getMenu,
  getAllMenusByCreds,
  updateMenu,
  deleteMenu
};