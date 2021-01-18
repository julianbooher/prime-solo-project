import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* fetchTeamInfo(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const response = yield axios.get(`api/team/${action.payload}`, config);
  
      yield put({ type: 'SET_INFO', payload: response.data });
    } catch (error) {
      console.log('teamInfo.saga.js fetchTeamInfo failed', error);
    }
  }

// GET ROUTE
function* fetchTeamPlayers(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get(`api/team/players/${action.payload}`, config);

    yield put({ type: 'SET_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('teamInfo.saga.js fetchTeamPlayers failed', error);
  }
}
  
  function* teamsSaga() {
    yield takeLatest('FETCH_TEAM_INFO', fetchTeamInfo);
    yield takeLatest('FETCH_TEAM_PLAYERS', fetchTeamPlayers);

  }
  
  export default teamsSaga;