
const express = require("express");
const router = express.Router();

const {
  getUser,
  updateUser,
  getAllUsers,
} = require("../controller/usersController");

router.get("/:user_id", async (req, res) => {
    const user_email = req.params.user_id;
    console.log(user_email);
    try {
      const userDetails = await getUser(user_email);
      if (userDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...userDetails.body.dataValues,
          },
          
        });
      } else if (userDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: userDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: userDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting user profile: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:userId", async (req, res) => {
    const updateData = req.body;
    const user_id = req.params.userId;
    try {
      const updateRes = await updateUser(user_id, updateData);
      const userObject = await getUser(user_id) 
      if (updateRes.statusCode === 200 && userObject.statusCode === 200) {

        res.status(200).send({
            user:{
                ...userObject.body.dataValues
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
      console.log("Error encountered while updating user: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });


  router.get("/users/all-users", async (req, res) => {

    try {
      const userDetails = await getAllUsers();
      if (userDetails.statusCode === 200) {
        res.status(200).send({
          data:userDetails.body,
          
        });
      } else if (userDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: userDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: userDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting all users: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  module.exports = router;