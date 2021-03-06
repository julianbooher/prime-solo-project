import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import fixtures from './fixtures.reducer';
import teams from './teams.reducer'
import comments from './comments.reducer';
import info from './info.reducer';
import players from './players.reducer';
import userRating from './userRating.reducer';
import statistics from './statistics.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  fixtures,
  teams,
  comments,
  info,
  players,
  userRating,
  statistics,
});

export default rootReducer;
