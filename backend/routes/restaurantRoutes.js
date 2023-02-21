const express = require("express");
const { getRestaurant, getAllRestaurants, updateRestaurant } = require("../controller/restaurantsController");
const router = express.Router();





router.get("/:restaurant_id", async (req, res) => {
    const id = req.params.restaurant_id;
    console.log(id)
    try {
      const restaurantDetails = await getRestaurant(id);
      if (restaurantDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...restaurantDetails.body.dataValues,
          },
          
        });
      } else if (restaurantDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: restaurantDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: restaurantDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting restaurant profile: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:restaurantID", async (req, res) => {
    const updateData = req.body;
    const restaurant_id = req.params.restaurantID;
    try {
      const updateRes = await updateRestaurant(restaurant_id, updateData);
      const restaurantObject = await getRestaurant(restaurant_id) 
      if (updateRes.statusCode === 200 && restaurantObject.statusCode === 200) {

        res.status(200).send({
            restaurant:{
                ...restaurantObject.body.dataValues
            },
            
            message:"Profile updated successfully!"

      }) 
    }
      else {
        console.log("Error encountered while updating profile: ", updateRes.body);
        res.status(500).send({
          errors: {
            message: "Internal Server Error",
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while updating restaurant: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });


  router.get("/", async (req, res) => {

        try {
          const restaurants = await getAllRestaurants();
          if (restaurants.statusCode === 200) {
            res.status(200).send({
              restaurants: restaurants.body,
            });
          } else {
            res.status(restaurants.statusCode).send({
              message: restaurants.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching restaurants: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });
  
  module.exports = router;

module.exports = router;