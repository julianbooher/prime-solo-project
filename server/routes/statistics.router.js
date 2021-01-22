const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');
require('dotenv').config();
const FOOTBALL_KEY = process.env.FOOTBALL_API_KEY;



router.get('/player/:id', rejectUnauthenticated, (req, res) => {
    const playerId = req.params.id

    axios.get(`https://v3.football.api-sports.io/players?id=${playerId}&season=2020`,{
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
		    "x-rapidapi-key": `${FOOTBALL_KEY}`
        }
    })
    .then((response) => {
      res.send(response.data.response[0]);
    })
    .catch((error) => {
      console.log('Error in /players/team GET route', error);
      res.sendStatus(500);
    })
  });
  
  module.exports = router;