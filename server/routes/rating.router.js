const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  console.log(req.user)
  // RETURNING "id" will give us back the id of the created rating
  const insertRatingQuery = `
  INSERT INTO "rating" ("user_id", "fixture_id", "player_of_the_match", "comment")
  VALUES ($1, $2, $3, $4)
  RETURNING "id";`

  // FIRST QUERY MAKES Rating
  pool.query(insertRatingQuery, [req.user.id, req.body.fixture_id, req.body.player_id, req.body.comment])
  .then(result => {
    console.log('New rating id:', result.rows[0].id); //ID IS HERE!
    
    const createdRatingId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const insertRatingDataQuery = `
      INSERT INTO "rating_data" ("rating_id", "team_id", "home", "atk_rating", "df_rating")
      VALUES  ($1, $2, true, $3, $4), ($1, $5, false, $6, $7);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertRatingDataQuery, 
        [
          createdRatingId, 
          req.body.home_team_id,
          req.body.home_atk_rating,
          req.body.home_df_rating,
          req.body.away_team_id,
          req.body.away_atk_rating,
          req.body.away_df_rating,
        ])
      .then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})


router.delete('/:id', rejectUnauthenticated, (req, res) => {

  console.log(req.body);
  console.log(req.user)

  // deletes the 2 instances of rating data for a particular fixture, from a particular user.
  const deleteRatingDataQuery = `
                                DELETE FROM rating_data 
                                WHERE rating_data.rating_id = (SELECT id FROM rating 
                                WHERE rating.fixture_id = $1 AND rating.user_id = $2)
                                ;`

  pool.query(deleteRatingDataQuery, [req.params.id, req.user.id])
  .then(result => {
    // deletes the rating data itself
    const deleteRatingQuery = `
                              DELETE FROM rating 
                              WHERE rating.fixture_id = $1 AND rating.user_id = $2
                              ;`

    pool.query(deleteRatingQuery, [req.params.id, req.user.id])

    .then(result => {
      // Send back success when 2nd is complete.
      res.sendStatus(201);
    }).catch(err => {
        // catch for second query
      console.log(err);
      res.sendStatus(500)
    })
// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  console.log(req.user)
  // RETURNING "id" will give us back the id of the created rating
  const updateRatingQuery = `
                            UPDATE rating 
                            SET player_of_the_match = $1, comment = $2
                            WHERE rating.fixture_id = $3 AND rating.user_id = $4
                            returning id
                            ;`

  // FIRST QUERY MAKES Rating
  pool.query(updateRatingQuery, [req.body.potm_id, req.body.comment, req.params.id, req.user.id])
  .then(result => {
    console.log('New rating id:', result.rows[0].id); //ID IS HERE!
    
    const updatedRatingId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const updateHomeDataQuery = `
                                UPDATE rating_data
                                SET atk_rating = $1, df_rating = $2
                                WHERE rating_id = $3 AND home = true
                                ;`
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(updateHomeDataQuery,
        [
          req.body.home_atk_rating,
          req.body.home_df_rating,
          updatedRatingId,
        ])
      .then(result => {
        const updateAwayDataQuery = `
                                UPDATE rating_data
                                SET atk_rating = $1, df_rating = $2
                                WHERE rating_id = $3 AND home = false
                                ;`
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
        pool.query(updateAwayDataQuery,
        [
          req.body.away_atk_rating,
          req.body.away_df_rating,
          updatedRatingId,
        ]).then((results) => {
          res.sendStatus(200);

        }).catch((error) => {
          console.log('error in AwayData rating.put', error);
          res.sendStatus(500)
        })
      }).catch(error => {
        // catch for second query
        console.log('error in HomeData rating.put', error);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(error => {
    console.log('error in rating table rating.put', error);
    res.sendStatus(500)
  })
})
module.exports = router;
