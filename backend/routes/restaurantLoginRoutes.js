const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantByCreds,
} = require("../controller/restaurantsController");

router.post("/api/auth/register", async (req, res) => {
  const restaurantDetails = req.body;
  const {
    restaurant_name,
      restaurant_email,
      address_id,
      type_of_dishes,
      delivery_type,
    description,
    opens_at,
    closes_at,
    cuisine_type,
    phone_number,
    delivery_fee,
    rating,
    password,
    restaurant_dp,
    street,
    city,
    state,
    country,
    pincode,
  } = restaurantDetails;
  try {
   
    
    let restaurant = await getRestaurantByCreds(restaurant_email);
    if(restaurant.statusCode === 200) {
      res.status(403).send({
        errors: {
          message: "Restaurant already registered.",
        },
      });
    }
    else {


      const createRes = await createRestaurant(
      restaurant_name,
      restaurant_email,
      address_id,
      type_of_dishes,
      delivery_type,
    description,
    opens_at,
    closes_at,
    cuisine_type,
    phone_number,
    delivery_fee,
    rating,
    password,
    restaurant_dp,
    street,
    city,
    state,
    country,
    pincode 
      );
      if (createRes.statusCode === 201) {
    
        res.status(201).send({
          restaurant: {
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
    }
  } catch (err) {
    console.log("Error encountered while registering restaurant: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

router.post("/api/auth/login", async (req, res) => {
  const restaurantCreds = req.body;
  const { restaurant_email } = restaurantCreds;
  const { password } = restaurantCreds;
  console.log(restaurant_email)
  try {
    let restaurantDetails = await getRestaurantByCreds(restaurant_email);
    
    if (restaurantDetails.statusCode === 200) {
        restaurantDetails = restaurantDetails.body.dataValues;
      bcrypt.compare(password, restaurantDetails.password, (err, isMatch) => {
        console.log(bcrypt.hashSync(password, 10));
        if (err) {
          res.status(500).send({
            errors: {
              message: err,
            },
          });
        } else if (!isMatch) {
          res.status(403).send({
            errors: {
              message: "Incorrect Password",
            },
          });
        } else {
          console.log("Successfully logged in");
          delete restaurantDetails.password;
          res.status(200).send({
            restaurant: {
              ...restaurantDetails,
            },
          });
        }
      });
    } else {
      res.status(restaurantDetails.statusCode).send({
        errors: {
          message: restaurantDetails.body,
        },
      });
    }
  } catch (err) {
    console.log("Error encountered while restaurant login: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});
module.exports = router;