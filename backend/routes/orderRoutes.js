const express = require("express");
const { getAllMenusByCreds,getMenu, createMenu,
deleteMenu,updateMenu } = require("../controller/menuController");
const router = express.Router();



router.post("/create", async (req, res) => {
    const menuDetails = req.body;
    const {
         
  restaurant_email,
  description,
  rating,
  price,
  availability,
  cuisine
    } = menuDetails;
    try {
  const createRes = await createMenu(
        
    restaurant_email,
    description,
    rating,
    price,
    availability
    ,cuisine
        );
        if (createRes.statusCode === 201) {
      
          res.status(201).send({
            menu: {
              ...createRes.body.dataValues,
            },
          });
        } else {
          res.status(500).send({
            errors: {
              message: createRes.body,
            },
          });
        }
      
    } catch (err) {
      console.log("Error encountered while creating menu: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });

router.get("/:menu_id", async (req, res) => {
    const id = req.params.menu_id;
    console.log(id)
    try {
      const menuDetails = await getMenu(id);
      if (menuDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...menuDetails.body.dataValues,
          },
          
        });
      } else if (menuDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: menuDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: menuDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting the menu details : ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:menu_id", async (req, res) => {
    const updateData = req.body;
    const menu_ID = req.params.menu_id;
    try {
      const updateRes = await updateMenu(menu_ID, updateData);
      const menuObject = await getMenu(menu_ID) 
      if (updateRes.statusCode === 200 && menuObject.statusCode === 200) {

        res.status(200).send({
            menu:{
                ...menuObject.body.dataValues
            },
            
            message:"Menu updated successfully!"

      }) 
    }
      else {
        console.log("Error encountered while updating Menu: ", updateRes.body);
        res.status(500).send({
          errors: {
            message: "Internal Server Error",
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while updating Menu: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });


  router.get("/all-menus/:restaurant_email", async (req, res) => {

        try {
          const menus = await getAllMenusByCreds(req.params.restaurant_email);
          if (menus.statusCode === 200) {
            res.status(200).send({
                menus: menus.body,
            });
          } else {
            res.status(menus.statusCode).send({
              message: menus.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching menus: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });

    router.delete("/:menu_id",async (req,res) =>{
        try {
            const deletedObject = await deleteMenu(req.params.menu_id);
            console.log(deletedObject)
            if (deletedObject.statusCode === 200){
                res.status(200).send({
                    message:"Menu Object deleted successfully"
                })
            }
            else{
                res.status(deletedObject.statusCode).send({
                    message:deletedObject.body
                })
            }
            
        } catch (err) {
            console.log("Unable to delete menu item.",err)
            res.status(500).send({
                errors:{
                    message:"Internal server error"
                }
            })
            
        }})
  

module.exports = router;