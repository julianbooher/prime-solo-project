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

// ------------ ROUTER FROM MOVIES SAGA TO USE THE SYNTAX OF FOR RATING SUBMIT -------------
// router.post('/', (req, res) => {
//   console.log(req.body);
//   // RETURNING "id" will give us back the id of the created movie
//   const insertMovieQuery = `
//   INSERT INTO "movies" ("title", "poster", "description")
//   VALUES ($1, $2, $3)
//   RETURNING "id";`

//   // FIRST QUERY MAKES MOVIE
//   pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
//   .then(result => {
//     console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
//     const createdMovieId = result.rows[0].id

//     // Depending on how you make your junction table, this insert COULD change.
//     const insertMovieGenreQuery = `
//       INSERT INTO "movies_genres" ("movies_id", "genres_id")
//       VALUES  ($1, $2);
//       `
//       // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
//       pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
//         //Now that both are done, send back success!
//         res.sendStatus(201);
//       }).catch(err => {
//         // catch for second query
//         console.log(err);
//         res.sendStatus(500)
//       })

// // Catch for first query
//   }).catch(err => {
//     console.log(err);
//     res.sendStatus(500)
//   })
// })
module.exports = router;
