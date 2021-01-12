import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

// GET ROUTE
function* fetchFixtures(action) {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      console.log('action payload', action.payload)
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

  // // POST ROUTE
  // function* addItem (action) {
  //   try {
  //     const config = {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     };
  
  //     yield axios.post('api/shelf', action.payload, config);
  //     yield put({ type: 'FETCH_SHELF' });
  //   } catch (error) {
  //     console.log('Shelf post request failed', error);
  //   }
  // }

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
  
  function* fixturesSaga() {
    yield takeLatest('FETCH_FIXTURES', fetchFixtures);
    // yield takeLatest('ADD_ITEM', addItem);
    // yield takeLatest('DELETE_ITEM', deleteItem);
    // yield takeLatest('EDIT_ITEM', editItem);
  }
  
  export default fixturesSaga;