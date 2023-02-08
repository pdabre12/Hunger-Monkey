const express = require("express");
const router = express.Router();

const getUsers = require("../controller/usersController");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    if (users.statusCode === 200) {
      res.status(200).send({
        users: users.body,
      });
    } else {
      res.status(users.statusCode).send({
        message: users.body,
      });
    }
  } catch (err) {
    console.log("Error encountered while searching users: ", err);
    res.status(500).send({
      errors: {
        message: "Internal Server Error",
      },
    });
  }
});

module.exports = router;