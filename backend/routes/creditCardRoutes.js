const express = require("express");
const { getCreditCard,getAllCreditCardsByCreds, createCreditCard,
updateCreditCard } = require("../controller/creditCardController");
const router = express.Router();



router.post("/create", async (req, res) => {
    const creditCardDetails = req.body;
    const {
        email,
  address_id,
  name,
  expiry_date,
    } = creditCardDetails;
    try {
  const createRes = await createCreditCard(
        
    email,
    address_id,
    name,
    expiry_date,
        );
        if (createRes.statusCode === 201) {
      
          res.status(201).send({
            creditCard: {
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
      console.log("Error encountered while creating credit card: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });

router.get("/:creditCard_id", async (req, res) => {
    const id = req.params.creditCard_id;
    console.log(id)
    try {
      const creditCardDetails = await getCreditCard(id);
      if (creditCardDetails.statusCode === 200) {
        res.status(200).send({
          data: {
            ...creditCardDetails.body.dataValues,
          },
          
        });
      } else if (creditCardDetails.statusCode === 404) {
        res.status(404).send({
          errors: {
            message: creditCardDetails.body,
          },
        });
      } else {
        res.status(500).send({
          errors: {
            message: creditCardDetails.body,
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while getting the credit card : ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });
  
  router.put("/:creditCard_id", async (req, res) => {
    const updateData = req.body;
    const creditCard_ID = req.params.creditCard_id;
    try {
      const updateRes = await updateCreditCard(creditCard_ID, updateData);
      const creditCardObject = await getCreditCard(creditCard_ID) 
      if (updateRes.statusCode === 200 && creditCardObject.statusCode === 200) {

        res.status(200).send({
            creditCard:{
                ...creditCardObject.body.dataValues
            },
            
            message:"Credit Card updated successfully!"

      }) 
    }
      else {
        console.log("Error encountered while updating credit card: ", updateRes.body);
        res.status(500).send({
          errors: {
            message: "Internal Server Error",
          },
        });
      }
    } catch (err) {
      console.log("Error encountered while updating credit card: ", err);
      res.status(500).send({
        errors: {
          message: "Internal Server Error",
        },
      });
    }
  });


  router.get("/all-credit-cards/:user_id", async (req, res) => {

        try {
          const creditCards = await getAllCreditCardsByCreds(req.params.user_id);
          if (creditCards.statusCode === 200) {
            res.status(200).send({
                creditCards: creditCards.body,
            });
          } else {
            res.status(creditCards.statusCode).send({
              message: creditCards.body,
            });
          }
        } catch (err) {
          console.log("Error encountered while searching creditCards: ", err);
          res.status(500).send({
            errors: {
              message: "Internal Server Error",
            },
          });
        }
      });
  

module.exports = router;