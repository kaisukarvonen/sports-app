import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import { loginUser } from './apis/users';
import { fetchMessage } from '../actions/sports';


function* loginUserWorker(action) {
  try {
    const response = yield call(loginUser, action);
    if (response.status === 200) {
      console.log('succesful');
      //yield put(actions.fetchedSports(response.data));
    } else {
      yield put(fetchMessage({ value: 'Username and password do not match', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Login failed, please try again', error: true }));
  }
}

const userSagas = [
  takeLatest(actions.LOGIN_USER, loginUserWorker),

];

export default userSagas;
