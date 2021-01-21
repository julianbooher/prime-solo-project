import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function* fetchUserPageComments(action) {
  try {
    let response
    if (action.payload){
      response = yield axios.get(`api/comments/user/${action.payload}`, config);
    } else {
      response = yield axios.get(`api/comments/user`, config);
    }
    yield put({ type: 'SET_COMMENTS', payload: response.data });  
  } catch (error) {
    console.log('error in userPage.saga.js fetchUserPageComments', error);
  }
}

function* fetchUserPageInfo(action) {
  try {
    let response = yield axios.get(`api/user/info/${action.payload}`, config);
    yield put({ type: 'SET_INFO', payload: response.data });  
  } catch (error) {
    console.log('error in userPage.saga.js fetchUserPageInfo', error);
  }
}


  
function* userPageSaga() {
  yield takeLatest('FETCH_USER_COMMENTS', fetchUserPageComments);
  yield takeLatest('FETCH_USER_INFO', fetchUserPageInfo)

}
  
export default userPageSaga;