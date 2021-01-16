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
      console.log('Shelf post request failed', error);
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
      console.log('Shelf post request failed', error);
    }
  }

  // // DELETE ROUTE
  // function* deleteItem (action) {
  //   try {
  //     const config = {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     };
    
  //     yield axios.delete(`api/shelf`, {
  //       params: {
  //         itemId: action.payload.itemId,
  //         userId: action.payload.userId
  //       }
  //     }, config);

  //     yield put({ type: 'FETCH_SHELF' });
  //   } catch (error) {
  //     console.log('Shelf delete request failed', error);
  //   }
  // }

  // // PUT ROUTE
  // function* editItem (action) {
  //   console.log('editItem', action.payload);
  //   try {
  //     const config = {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     };
    
  //     yield axios.put(`api/shelf/${action.payload.id}`, action.payload, config);
  //     yield put({ type: 'FETCH_SHELF' });
  //   } catch (error) {
  //     console.log('Shelf put request failed', error);
  //   }
  // }
  
  function* ratingSaga() {
    yield takeLatest('ADD_RATING', addRating);
    yield takeLatest('UPDATE_RATING', updateRating);
  }
  
  export default ratingSaga;