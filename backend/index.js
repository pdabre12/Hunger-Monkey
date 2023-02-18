const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const verifyToken = require("./middleware/auth");
 

    
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Hunger Monkey listening on port ${port}!`);
});

app.use("/user",require("./routes/loginRoutes"));
app.use("/profile",verifyToken, require("./routes/userRoutes"));
app.use("/restaurants", require("./routes/restaurantRoutes"));
app.get("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
