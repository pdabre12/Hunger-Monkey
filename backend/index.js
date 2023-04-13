const express = require("express");
const app = express();
const fetch = require("node-fetch")
const port = 8000;
const cors = require('cors');


const stripe = require('stripe')('sk_test_51MvqrzHpQk3wJsSxC81AY79qCb4FUnV9Q3atTjMVDF720Gw0OOnZJweyeFAF8OAqVUpHJoRMl7kRmOsoGLsw0fcM009BvDJwdH')

    
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

app.post('/create-checkout-session', async (req, res) => {
  console.log("here")
  console.log(req.body.cartItems)
  const line_items = req.body.cartItems.map(item=>{
    return {

      price_data: {
        currency: 'usd',
        product_data: {
          name: item.dish_name,
          images: [item.menu_dp],
          description: item.description,
          metadata:{
            id:item.id
          }
        },
        unit_amount: item.price*100,
      },
      quantity: item.quantity,

    }
  })
  const session = await stripe.checkout.sessions.create({

    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',
    cancel_url: 'http://localhost:3000/userdash/cart',
  });

  res.send({url:session.url});
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

