const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get info for a particular team, including venue information.
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
                    SELECT team.name AS team_name, founded, venue.name AS venue_name, venue.id AS venue_id, venue.city AS city FROM team
                    JOIN venue_team ON venue_team.team_id = team.id
                    JOIN venue ON venue.id = venue_team.venue_id
                    WHERE team.id = $1
                    ;`
  pool.query(queryText, [req.params.id])
  .then((results) => {
    res.send(results.rows[0]);
  })
  .catch((error) => {
    console.log('Error in /teams GET route', error);
    res.sendStatus(500);
  })
});

// get players from a particular team.
router.get('/players/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
                    SELECT player.id AS player_id, player.name AS player_name, position 
                    FROM player
                    JOIN player_team ON player.id = player_team.player_id
                    WHERE player_team.team_id = $1
                        ;`
    pool.query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error in /team/players GET route', error);
      res.sendStatus(500);
    })
  });


// GET route with parameters
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;