const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get players from a specific team id
router.get('/team/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
                    SELECT team.id, team.name, team.founded, venue.id AS venue_id, venue.name as venue_name, city FROM team
                    JOIN venue_team ON venue_team.team_id = team.id
                    JOIN venue on venue.id = venue_team.venue_id
                    ORDER BY name ASC
                    ;`
  pool.query(queryText)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in /players/team GET route', error);
    res.sendStatus(500);
  })
});

module.exports = router;