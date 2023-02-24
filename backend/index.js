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

app.use("/user",require("./routes/userLoginRoutes"));
app.use("/profile",verifyToken, require("./routes/userRoutes"));
app.use("/restaurants",require("./routes/restaurantLoginRoutes"));
app.use("/restaurants",verifyToken,require("./routes/restaurantRoutes"));
app.use("/addresses",verifyToken,require("./routes/addressRoutes"));
app.use("/credit-cards",verifyToken,require("./routes/creditCardRoutes"))
app.use("/menus",verifyToken,require("./routes/menuRoutes"));
app.use("/orders",verifyToken,require("./routes/orderRoutes"));

