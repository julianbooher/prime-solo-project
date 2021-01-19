import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

function* fetchHomePageComments(action) {
  try {
    const response = yield axios.get(`api/comments/`, config);
    yield put({ type: 'SET_COMMENTS', payload: response.data });  
  } catch (error) {
    console.log('error in homePage.saga.js fetchHomePageComments', error);
  }
}
  
function* homePageSaga() {
  yield takeLatest('FETCH_HOME_COMMENTS', fetchHomePageComments);

}
  
  export default homePageSaga;