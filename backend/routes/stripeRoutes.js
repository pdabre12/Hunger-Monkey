const express = require("express");
const router = express.Router();
const { updateOrder,deleteOrder } = require("../controller/orderController");
const stripe = require('stripe')('sk_test_51MvqrzHpQk3wJsSxC81AY79qCb4FUnV9Q3atTjMVDF720Gw0OOnZJweyeFAF8OAqVUpHJoRMl7kRmOsoGLsw0fcM009BvDJwdH')
const endpointSecret='whsec_25b10e70564c021b223fa86d577e790b9487c5843df3a98dacdabffdd27717f7';
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
      metadata:{order_id:req.body.order_id},
      success_url: 'http://localhost:3000/successcheckout',
      cancel_url: 'http://localhost:3000/cancelcheckout',
    });


  
    res.send({url:session.url});
  });


  router.post('/webhook', async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
  
    try {
    
      event = stripe.webhooks.constructEvent(request.rawBody,sig,endpointSecret);
      
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionData = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
            expand: ['line_items'],
        }
      );
      console.log(sessionData)
      // Fulfill the purchase...
      const updateRes = await updateOrder(sessionData.metadata.order_id, {"status":"Placed"});
      console.log(updateRes)
    }

  
    response.status(200).end();
  });

  module.exports = router;