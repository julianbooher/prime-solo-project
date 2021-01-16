import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

// GET ROUTE
function* fetchFixtureInfo(action) {
    try {
      const response = yield axios.get(`api/fixture/info/${action.payload}`, config);
      yield put({ type: 'SET_FIXTURE_INFO', payload: response.data[0] });
      yield put({ type: 'FETCH_FIXTURE_COMMENTS', payload: action.payload});
    } catch (error) {
      console.log('api/fixture/info get request failed', error);
    }
  }

// GET ROUTE
function* fetchFixtureComments(action) {
  try {
    const response = yield axios.get(`api/fixture/comments/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_COMMENTS', payload: response.data });
    yield put({ type: 'FETCH_FIXTURE_PLAYERS', payload: action.payload});

  } catch (error) {
    console.log('api/fixture/comments get request failed', error);
  }
}
// GET ROUTE
function* fetchFixturePlayers(action) {
  try {
    const response = yield axios.get(`api/fixture/players/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_PLAYERS', payload: response.data });
    yield put({ type: 'FETCH_FIXTURE_USER_RATING', payload: action.payload});

  } catch (error) {
    console.log('api/fixture/comments get request failed', error);
  }
}

function* fetchFixtureUserRating(action) {
  try {
    const response = yield axios.get(`api/fixture/currentuser/${action.payload}`, config);
    yield put({ type: 'SET_FIXTURE_USER_RATING', payload: response.data });
  } catch (error) {
    console.log('api/fixture/info get request failed', error);
  }
}
  
  function* fixtureInfoSaga() {
    yield takeLatest('FETCH_FIXTURE_INFO', fetchFixtureInfo);
    yield takeLatest('FETCH_FIXTURE_COMMENTS', fetchFixtureComments);
    yield takeLatest('FETCH_FIXTURE_PLAYERS', fetchFixturePlayers);
    yield takeLatest('FETCH_FIXTURE_USER_RATING', fetchFixtureUserRating);
  }
  
  export default fixtureInfoSaga;