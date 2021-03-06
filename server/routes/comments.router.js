const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET ratings with params for specific fixture.
router.get('/', rejectUnauthenticated, (req, res) => {
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
                  ORDER BY rating.id DESC
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

// gets current user's comments
router.get('/user/', rejectUnauthenticated, (req, res) => {
  console.log('in comments/user/ get')
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
                  WHERE "user".username = $1
                  ;`
  pool.query(queryText, [req.user.username])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('error in comments.router.js comments/user/', error);
    res.sendStatus(500);
  })
});


// gets a comment by username
router.get('/user/:username', rejectUnauthenticated, (req, res) => {
  console.log('in comments/user/username get')
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
                  WHERE "user".username = $1
                  ;`
  pool.query(queryText, [req.params.username])
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in comments.router.js comments/user/username route', error);
    res.sendStatus(500);
  })
});




module.exports = router;
