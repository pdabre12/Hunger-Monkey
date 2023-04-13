const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51MvqrzHpQk3wJsSxC81AY79qCb4FUnV9Q3atTjMVDF720Gw0OOnZJweyeFAF8OAqVUpHJoRMl7kRmOsoGLsw0fcM009BvDJwdH')


router.post('/create-checkout-session', async (req, res) => {
 
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

  module.exports = router;