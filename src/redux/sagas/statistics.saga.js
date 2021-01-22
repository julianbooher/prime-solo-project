import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* fetchPlayerStatistics(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      const response = yield axios.get(`api/statistics/player/${action.payload}`, config);
      console.log(response)
      const { player, statistics } = response.data;

      // For outfield player
      yield put({
           type: 'SET_STATISTICS', 
           payload: {
               name: `${player.firstname} ${player.lastname}`,
               age: player.age,
               birthDate: player.birth.date,
               birthPlace: `${player.birth.place}, ${player.birth.country}`,
               nationality: player.nationality,
               position: statistics[0].games.position,
               appearences: statistics[0].games.appearences,
               minutes: statistics[0].games.minutes,
               totalShots: statistics[0].shots.total,
               shotsOnTarget: statistics[0].shots.on,
               goals: statistics[0].goals.total,
               assists: statistics[0].goals.assits,
               passes: statistics[0].passes.total,
               keyPasses: statistics[0].passes.key,
               tackles: statistics[0].tackles.total,
               interceptions: statistics[0].tackles.interceptions,
               duelsTotal: statistics[0].duels.total,
               duelsWon: statistics[0].duels.won,
               dribbles: statistics[0].dribbles.success,
               foulsCommitted: statistics[0].fouls.committed,
               foulsDrawn: statistics[0].fouls.drawn

           } 
        });
    } catch (error) {
      console.log('fetchPlayerStatistics in statistics.saga.js failed', error);
    }
  }
  
  function* statisticsSaga() {
    yield takeLatest('FETCH_PLAYER_STATISTICS', fetchPlayerStatistics);
  }
  
  export default statisticsSaga;