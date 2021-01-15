import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

// GET ROUTE
function* fetchFixtureInfo(action) {
    try {
      console.log('action payload', action.payload)
      const response = yield axios.get(`api/fixture/info/${action.payload}`, config);
      yield put({ type: 'SET_FIXTURE_INFO', payload: response.data[0] });
    } catch (error) {
      console.log('api/fixture/info get request failed', error);
    }
  }

// GET ROUTE
function* fetchFixtureComments(action) {
  try {
    console.log('action payload', action.payload)
    const response = yield axios.get(`api/fixture/comments/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_COMMENTS', payload: response.data });
  } catch (error) {
    console.log('api/fixture/comments get request failed', error);
  }
}
// GET ROUTE
function* fetchFixturePlayers(action) {
  try {
    console.log('action payload', action.payload)
    const response = yield axios.get(`api/fixture/players/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('api/fixture/comments get request failed', error);
  }
}
  
  function* fixtureInfoSaga() {
    yield takeLatest('FETCH_FIXTURE_INFO', fetchFixtureInfo);
    yield takeLatest('FETCH_FIXTURE_COMMENTS', fetchFixtureComments);
    yield takeLatest('FETCH_FIXTURE_PLAYERS', fetchFixturePlayers);
  }
  
  export default fixtureInfoSaga;