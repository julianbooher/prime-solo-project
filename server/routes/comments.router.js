const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET ratings with params for specific fixture.
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture/comments get')
  const queryText = `
                    SELECT comment, player.name AS potm_name, player_of_the_match AS potm_id, "user".username,
                    (SELECT atk_rating AS home_atk_rating
                     FROM rating_data WHERE rating.id = rating_data.rating_id 
                     AND rating_data.home = true),
                    (SELECT df_rating AS home_df_rating
                     FROM rating_data WHERE rating.id = rating_data.rating_id 
                     AND rating_data.home = true),
                    (SELECT atk_rating AS away_atk_rating
                     FROM rating_data WHERE rating.id = rating_data.rating_id 
                     AND rating_data.home = false),
                    (SELECT df_rating AS away_df_rating
                     FROM rating_data WHERE rating.id = rating_data.rating_id 
                     AND rating_data.home = false)
                    FROM rating
                    JOIN "user" ON "user".id = rating.user_id
                    JOIN player ON rating.player_of_the_match = player.id
                    ORDER BY rating.id ASC
                    ;`
  pool.query(queryText)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in fixtures.router.js GET route', error);
    res.sendStatus(500);
  })
});


module.exports = router;
