import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE FOR FIXTURES
function* fetchFixtures(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      
      
      // If it has a payload, search for fixtures from a specific team, if it doesn't, get all fixtures.
      let response;
      if (action.payload > 0){
        response = yield axios.get(`api/fixtures/${action.payload}`, config);
      } else {
        response = yield axios.get('api/fixtures', config);
      }
  
      yield put({ type: 'SET_FIXTURES', payload: response.data });
    } catch (error) {
      console.log('Shelf get request failed', error);
    }
  }

  function* fixturesSaga() {
    yield takeLatest('FETCH_FIXTURES', fetchFixtures);

  }
  
  export default fixturesSaga;