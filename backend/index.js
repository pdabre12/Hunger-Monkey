const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');


    
app.use(cors());

// parse requests of content-type - application/json
// app.use(express.json());
app.use(express.json({
  limit: '5mb',
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
  console.log(`Hunger Monkey listening on port ${port}!`);
});

app.use("/user",require("./routes/userLoginRoutes"));
app.use("/profile", require("./routes/userRoutes"));
app.use("/restaurants",require("./routes/restaurantLoginRoutes"));
app.use("/restaurants",require("./routes/restaurantRoutes"));
app.use("/addresses",require("./routes/addressRoutes"));
app.use("/credit-cards",require("./routes/creditCardRoutes"))
app.use("/menus",require("./routes/menuRoutes"));
app.use("/stripe",require("./routes/stripeRoutes"));
app.use("/orders",require("./routes/orderRoutes"));

app.use("/distance",require("./routes/distanceRoutes"));

