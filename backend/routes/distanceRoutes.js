const express = require("express");

const router = express.Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json' +
      `?origins=${req.query.origins}` +
      `&destinations=${req.query.destinations}` +
      `&departure_time=${req.query.departure_time}` +
      `&key=AIzaSyBsHMvydHbPzCDdvqV-hhGfo3haF43q8LQ`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => res.send(data))
      .catch(error => {
        console.error(error);
        res.status(500).send({ error: 'Error making API request' });
      });
  });

  module.exports=router;