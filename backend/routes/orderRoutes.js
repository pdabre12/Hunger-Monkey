const express = require("express");
const { getAllOrdersByCredsDeliveryPerson,getAllOrdersByCredsRestaurant, getAllOrdersByCredsUser,
getOrder,updateOrder,deleteOrder, createOrder, getAllOrders } = require("../controller/orderController");
const router = express.Router();



router.post("/create", async (req, res) => {
    const orderDetails = req.body;
    const {
         
      restaurant_email,
      email,
      // deliveryPerson_email,
      status,
      price,
      placed_order_time,
      // order_delivered_time,
      ordered_menu_items,
      delivery_address,
      restaurant_address
    } = orderDetails;
    try {
  const createRes = await createOrder(
        
    restaurant_email,
  email,
  // deliveryPerson_email,
  status,
  price,
  placed_order_time,
  // order_delivered_time,
  ordered_menu_items,
  delivery_address,
  restaurant_address
        );
        if (createRes.statusCode === 201) {
      
          res.status(201).send({
            order: {
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
      console.log("Error encountered while creating order: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });

router.get("/get-order/:order_id", async (req, res) => {
    const id = req.params.order_id;
    console.log(id)
    try {
      const orderDetails = await getOrder(id);
      if (orderDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...orderDetails.body.dataValues,
          },
          
        });
      } else if (orderDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: orderDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: orderDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting the order details : ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:order_id", async (req, res) => {
    const updateData = req.body;
    const order_ID = req.params.order_id;
    try {
      const updateRes = await updateOrder(order_ID, updateData);
      const orderObject = await getOrder(order_ID) 
      if (updateRes.statusCode === 200 && orderObject.statusCode === 200) {

        res.status(200).send({
            order:{
                ...orderObject.body.dataValues
            },
            
            message:"Order updated successfully!"

      }) 
    }
      else {
        console.log("Error encountered while updating Order: ", updateRes.body);
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


  router.get("/all-orders/restaurants/:restaurant_email", async (req, res) => {

        try {
          const orders = await getAllOrdersByCredsRestaurant(req.params.restaurant_email);
          if (orders.statusCode === 200) {
            res.status(200).send({
                orders: orders.body,
            });
          } else {
            res.status(orders.statusCode).send({
              message: orders.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching orders: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });

      router.get("/all-orders/users/:email", async (req, res) => {

        try {
          const orders = await getAllOrdersByCredsUser(req.params.email);
          if (orders.statusCode === 200) {
            res.status(200).send({
                orders: orders.body,
            });
          } else {
            res.status(orders.statusCode).send({
              message: orders.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching orders: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });

      router.get("/all-orders/deliveryperson/:deliveryPerson_email", async (req, res) => {

        try {
          const orders = await getAllOrdersByCredsDeliveryPerson(req.params.deliveryPerson_email);
          if (orders.statusCode === 200) {
            res.status(200).send({
                orders: orders.body,
            });
          } else {
            res.status(orders.statusCode).send({
              message: orders.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching orders: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });
    router.delete("/:order_id",async (req,res) =>{
        try {
            const deletedObject = await deleteOrder(req.params.order_id);
            console.log(deletedObject)
            if (deletedObject.statusCode === 200){
                res.status(200).send({
                    message:"Order Object deleted successfully"
                })
            }
            else{
                res.status(deletedObject.statusCode).send({
                    message:deletedObject.message
                })
            }
            
        } catch (err) {
            console.log("Unable to delete order item.",err)
            res.status(500).send({
                errors:{
                    message:"Internal server error"
                }
            })
            
        }})

        router.get("/all-orders/", async (req, res) => {

          try {
            const orders = await getAllOrders();
            if (orders.statusCode === 200) {
              res.status(200).send({
                  orders: orders.body,
              });
            } else {
              res.status(orders.statusCode).send({
                message: orders.body,
              });
            }
          } catch (err) {
            console.log("Error encountered while searching orders: ", err);
            res.status(500).send({
              errors: {
                message: "Internal Server Error",
              },
            });
          }
        });





        // router.get("/all-orders/restaurants/:restaurant_email/new",async (req,res)=>{
        //   try {
            
        //   } catch (err) {
        //     console.log("Unable to delete order item.",err)
        //     res.status(500).send({
        //         errors:{
        //             message:"Internal server error"
        //         }
        //     })
            
        //   }
        // })
  

module.exports = router;