import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import fixturesSaga from './fixtures.saga';
import teamsSaga from './teams.saga';
import fixtureInfoSaga from './fixtureInfo.saga';
import ratingSaga from './rating.saga';
import teamInfo from './teamInfo.saga';
import unsetSaga from './unset.saga';
import homePageSaga from './homePage.saga';
import userPageSaga from './userPage.saga';
import statisticsSaga from './statistics.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    fixturesSaga(),
    teamsSaga(),
    fixtureInfoSaga(),
    ratingSaga(),
    teamInfo(),
    unsetSaga(),
    homePageSaga(),
    userPageSaga(),
    statisticsSaga(),
  ]);
}
