const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET fixture info with params for specific fixture.
router.get('/info/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture/info get')
  const queryText = `
                    SELECT fixture.date,
                    (SELECT team.name FROM team
                     JOIN team_fixture ON team.id = team_fixture.team_id 
                     WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_name,
                    (SELECT team.id FROM team
                     JOIN team_fixture ON team.id = team_fixture.team_id 
                     WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                     WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_goals,
                    (SELECT team.name FROM team
                     JOIN team_fixture ON team.id = team_fixture.team_id 
                     WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_name,
                    (SELECT team.id FROM team
                     JOIN team_fixture ON team.id = team_fixture.team_id 
                     WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                     WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_goals                 
                  FROM fixture
                  WHERE fixture.id = $1
                  GROUP BY fixture.id;`
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in fixtures.router.js GET route', error);
    res.sendStatus(500);
  })
});

// GET ratings with params for specific fixture.
router.get('/comments/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture/comments get')
  const queryText = `
                    SELECT comment, player.name AS potm_name, player_of_the_match AS potm_id, "user".username, "user".id AS user_id,
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
                      AND rating_data.home = false),
                      (SELECT team.name FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=true AND team_fixture.fixture_id=rating.fixture_id) AS home_team_name,
                      (SELECT team.id FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=true AND team_fixture.fixture_id=rating.fixture_id) AS home_team_id,
                      (SELECT team.name FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=false AND team_fixture.fixture_id=rating.fixture_id) AS away_team_name,
                      (SELECT team.id FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=false AND team_fixture.fixture_id=rating.fixture_id) AS away_team_id
                    FROM rating
                    JOIN "user" ON "user".id = rating.user_id
                    JOIN player ON rating.player_of_the_match = player.id
                    WHERE rating.fixture_id = $1 AND "user".id != $2
                    ;`
  pool.query(queryText, [req.params.id, req.user.id])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in fixtures.router.js GET route', error);
    res.sendStatus(500);
  })
});

// GET players from a specific fixture, param for fixture id.
router.get('/players/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture/players get')
  const queryText = `
                    SELECT player.name AS player_name, player.id AS player_id, team.name AS team_name FROM fixture
                    JOIN team_fixture ON fixture.id = team_fixture.fixture_id
                    JOIN team ON team.id = team_fixture.team_id
                    JOIN player_team ON player_team.team_id = team.id
                    JOIN player ON player.id = player_team.player_id
                    WHERE fixture.id = $1
                    ORDER BY team.name, player.name
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

// GET rating info from a particular fixture from the current user
router.get('/currentuser/:id', rejectUnauthenticated, (req, res) => {
  console.log('req.user in fixture/currentuser get')
  const queryText = `
                    SELECT comment, player_of_the_match AS potm_id, player.name AS potm_name,
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
                  JOIN player ON rating.player_of_the_match = player.id
                  WHERE rating.fixture_id = $1 AND rating.user_id = $2
                  ;`
  pool.query(queryText, [req.params.id, req.user.id])
  .then((results) => {
    res.send(results.rows[0]);
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
