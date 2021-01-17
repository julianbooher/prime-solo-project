import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

  // // POST ROUTE
  function* addRating (action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      yield axios.post('api/rating', action.payload, config);
      yield put({ type: 'FETCH_FIXTURE_COMMENTS', payload: action.payload.fixture_id });
    } catch (error) {
      console.log('Rating post request failed', error);
    }
  }

  // PUT ROUTE
  function* updateRating (action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      yield axios.put(`api/rating/${action.payload.fixture_id}`, action.payload, config);
      yield put({ type: 'FETCH_FIXTURE_COMMENTS', payload: action.payload.fixture_id });
    } catch (error) {
      console.log('Rating put request failed', error);
    }
  }

  // PUT ROUTE
  function* deleteRating (action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      yield axios.delete(`api/rating/${action.payload}`, config);
      yield put({ type: 'FETCH_FIXTURE_COMMENTS', payload: action.payload });
    } catch (error) {
      console.log('Rating delete request failed', error);
    }
  }
  
  function* ratingSaga() {
    yield takeLatest('ADD_RATING', addRating);
    yield takeLatest('UPDATE_RATING', updateRating);
    yield takeLatest('DELETE_RATING', deleteRating);
  }
  
  export default ratingSaga;