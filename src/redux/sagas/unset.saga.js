import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* unsetTeamPage() {
  try {  

    yield put({ type: 'UNSET_INFO' });
    yield put({ type: 'UNSET_FIXTURES' });
    yield put({ type: 'UNSET_PLAYERS' });
    
  } catch (error) {

    console.log('unsetTeamPage saga failed', error);

  }
}

function* unsetHomePage() {
  try {  

    yield put({ type: 'UNSET_FIXTURES' });
    yield put({ type: 'UNSET_COMMENTS' });
    
  } catch (error) {

    console.log('unsetHomePage saga failed', error);

  }
}

function* unsetFixtureInfoPage() {
  try {  

    yield put({ type: 'UNSET_INFO' });  
    yield put({ type: 'UNSET_USER_RATING' });
    yield put({ type: 'UNSET_PLAYERS' });
    yield put({ type: 'UNSET_COMMENTS' });
      
  } catch (error) {

    console.log('unsetFixtureInfoPage saga failed', error);

  }
}
  
function* unsetUserInfoPage() {
  try {  

    yield put({ type: 'UNSET_INFO' });  
    yield put({ type: 'UNSET_COMMENTS' });
      
  } catch (error) {

    console.log('unsetUserInfoPage saga failed', error);

  }
}
function* unsetSaga() {
  yield takeLatest('UNSET_TEAM_PAGE', unsetTeamPage);
  yield takeLatest('UNSET_FIXTURE_INFO_PAGE', unsetFixtureInfoPage);
  yield takeLatest('UNSET_HOME_PAGE', unsetHomePage);
  yield takeLatest('UNSET_USER_INFO', unsetUserInfoPage);
}
  
export default unsetSaga;