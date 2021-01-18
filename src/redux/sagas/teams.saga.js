import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* fetchTeams() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const response = yield axios.get('api/teams', config);
  
      yield put({ type: 'SET_TEAMS', payload: response.data });
    } catch (error) {
      console.log('Shelf get request failed', error);
    }
  }
  
  function* teamsSaga() {
    yield takeLatest('FETCH_TEAMS', fetchTeams);

  }
  
  export default teamsSaga;