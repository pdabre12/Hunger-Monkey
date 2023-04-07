const express = require("express");
const app = express();
const fetch = require("node-fetch")
const port = 8000;
const cors = require('cors');
const verifyToken = require("./middleware/auth");
const { response } = require("express");
 

    
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('/distance', (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/distancematrix/json' +
    `?origins=${req.query.origins}` +
    `&destinations=${req.query.destinations}` +
    `&departure_time=${req.query.departure_time}` +
    `&key=AIzaSyCaR2W_KsJlRo59ohQJMo34-Wm1rxbAsp4`;

  fetch(url)
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Error making API request' });
    });
});


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
app.use("/orders",require("./routes/orderRoutes"));

