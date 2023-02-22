const express = require("express");
const { getAddress, getAllAddressByCreds, updateAddress,
createAddress } = require("../controller/addressController");
const router = express.Router();



router.post("/create", async (req, res) => {
    const addressDetails = req.body;
    const {
        email,
        street,
        city,
        state,
        country,
        pincode
    } = addressDetails;
    try {
  const createRes = await createAddress(
        
            email,
            street,
            city,
            state,
            country,
            pincode
        );
        if (createRes.statusCode === 201) {
      
          res.status(201).send({
            address: {
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
      console.log("Error encountered while creating address: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });

router.get("/:address_id", async (req, res) => {
    const id = req.params.address_id;
    console.log(id)
    try {
      const addressDetails = await getAddress(id);
      if (addressDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...addressDetails.body.dataValues,
          },
          
        });
      } else if (addressDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: addressDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: addressDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting user address : ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:address_id", async (req, res) => {
    const updateData = req.body;
    const addressID = req.params.address_id;
    try {
      const updateRes = await updateAddress(addressID, updateData);
      const addressObject = await getAddress(addressID) 
      if (updateRes.statusCode === 200 && addressObject.statusCode === 200) {

        res.status(200).send({
            address:{
                ...addressObject.body.dataValues
            },
            
            message:"Profile updated successfully!"

      }) 
    }
      else {
        console.log("Error encountered while updating address: ", updateRes.body);
        res.status(500).send({
          errors: {
            message: "Internal Server Error",
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while updating address: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });


  router.get("/all-addresses/:user_id", async (req, res) => {

        try {
          const addresses = await getAllAddressByCreds(req.params.user_id);
          if (addresses.statusCode === 200) {
            res.status(200).send({
                addresses: addresses.body,
            });
          } else {
            res.status(addresses.statusCode).send({
              message: addresses.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching addresses: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });
  

module.exports = router;