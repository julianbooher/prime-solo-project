const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET fixture info with params for specific fixture.
router.get('/info/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture.get')
  const queryText = `
                    SELECT fixture.date,
                      (SELECT team.name FROM team
                       JOIN team_fixture ON team.id = team_fixture.team_id 
                       WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_name,
                      (SELECT team.id FROM team
                       JOIN team_fixture ON team.id = team_fixture.team_id 
                       WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_id,
                      (SELECT team.name FROM team
                       JOIN team_fixture ON team.id = team_fixture.team_id 
                       WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_name,
                      (SELECT team.id FROM team
                       JOIN team_fixture ON team.id = team_fixture.team_id 
                       WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_id
                    FROM fixture
                    WHERE fixture.id = $1
                    GROUP BY fixture.id
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

// GET ratings with params for specific fixture ratings.
router.get('/comments/:id', rejectUnauthenticated, (req, res) => {
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
