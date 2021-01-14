import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* fetchFixtureInfo(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      console.log('action payload', action.payload)
      const response = yield axios.get(`api/fixture/info/${action.payload}`, config);
      yield put({ type: 'SET_FIXTURE_INFO', payload: response.data });
    } catch (error) {
      console.log('api/fixture/info get request failed', error);
    }
  }

// GET ROUTE
function* fetchFixtureComments(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('action payload', action.payload)
    const response = yield axios.get(`api/fixture/comments/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_COMMENTS', payload: response.data });
  } catch (error) {
    console.log('api/fixture/comments get request failed', error);
  }
}
  
  function* fixtureInfoSaga() {
    yield takeLatest('FETCH_FIXTURE_INFO', fetchFixtureInfo);
    yield takeLatest('FETCH_FIXTURE_COMMENTS', fetchFixtureComments);
  }
  
  export default fixtureInfoSaga;