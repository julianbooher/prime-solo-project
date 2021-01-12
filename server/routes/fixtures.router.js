const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('req.user in shelf.get')
  const queryText = `
                    SELECT fixture.id, fixture.date,
                      (SELECT team.name FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=true AND fixture.id=fixture_id) AS home_team_name,
                      (SELECT team.name FROM team
                      JOIN team_fixture ON team.id = team_fixture.team_id 
                      WHERE team_fixture.home=false AND fixture.id=fixture_id) AS away_team_name
                    FROM fixture
                    JOIN team_fixture ON fixture.id = team_fixture.fixture_id
                    JOIN team on team.id = team_fixture.team_id
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
