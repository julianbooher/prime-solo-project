const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// /fixtures


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user in shelf.get')
  const queryText = `
                    SELECT fixture.id, fixture.date,
                    (SELECT team.name FROM team
                    JOIN team_fixture ON team.id = team_fixture.team_id 
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_name,
                    (SELECT team_fixture.team_id FROM team_fixture
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_goals,
                    (SELECT team.name FROM team
                    JOIN team_fixture ON team.id = team_fixture.team_id 
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_name,
                    (SELECT team_fixture.team_id FROM team_fixture
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_goals
                    FROM fixture
                    GROUP BY fixture.id
                    ORDER BY date DESC
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


// GET ROUTE WITH PARAMS
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
                    SELECT fixture.id, fixture.date,
                    (SELECT team.name FROM team
                    JOIN team_fixture ON team.id = team_fixture.team_id 
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_name,
                    (SELECT team_fixture.team_id FROM team_fixture
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                    WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_goals,
                    (SELECT team.name FROM team
                    JOIN team_fixture ON team.id = team_fixture.team_id 
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_name,
                    (SELECT team_fixture.team_id FROM team_fixture
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_id,
                    (SELECT team_fixture.goals FROM team_fixture
                    WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_goals
                    FROM fixture
                    JOIN team_fixture ON fixture.id = team_fixture.fixture_id
                    WHERE team_fixture.team_id = $1
                    GROUP BY fixture.id
                    ORDER BY date DESC
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
