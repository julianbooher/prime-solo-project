
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const fixturesRouter = require('./routes/fixtures.router');
const fixtureRouter = require('./routes/fixture.router');
const teamsRouter = require('./routes/teams.router');
const ratingRouter = require('./routes/rating.router');
const teamRouter = require('./routes/team.router');
const playersRouter = require('./routes/players.router');
const commentsRouter = require('./routes/comments.router');
const statisticsRouter = require('./routes/statistics.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/fixtures', fixturesRouter);
app.use('/api/fixture', fixtureRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/team', teamRouter);
app.use('/api/players', playersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/statistics', statisticsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
