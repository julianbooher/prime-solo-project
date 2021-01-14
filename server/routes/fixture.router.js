const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET all ratings, ordered by date.
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user in shelf.get')
  const queryText = `
                    
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

// GET ratings with params for specific fixture ratings.
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture.get')
  const queryText = `
                    SELECT comment, player.name AS potm_name, player_of_the_match AS potm_id, "user".username,
                    (SELECT ((atk_rating + df_rating) * 1.0 / 2) AS home_team_rating
                    FROM rating_data WHERE rating.id = rating_data.rating_id 
                    AND rating_data.home = true),
                    (SELECT ((atk_rating + df_rating) * 1.0 / 2) AS away_team_rating
                    FROM rating_data WHERE rating.id = rating_data.rating_id 
                    AND rating_data.home = false)
                    FROM rating
                    JOIN "user" ON "user".id = rating.user_id
                    JOIN player ON rating.player_of_the_match = player.id
                    WHERE rating.fixture_id = $1
                    ;`
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in fixtures.router.js GET route', error);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
