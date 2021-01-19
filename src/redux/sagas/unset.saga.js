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
  
  function* unsetSaga() {
    yield takeLatest('UNSET_TEAM_PAGE', unsetTeamPage);
  }
  
  export default unsetSaga;