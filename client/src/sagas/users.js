import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import { loginUser, logoutUser } from './apis/users';
import { fetchMessage } from '../actions/sports';


function* loginUserWorker(action) {
  try {
    const response = yield call(loginUser, action);
    if (response.status === 200) {
      console.log(window.sessionStorage.getItem('isAuthenticated'));
      window.sessionStorage.setItem('isAuthenticated', 'true');
      console.log(window.sessionStorage.getItem('isAuthenticated'));
      yield put(actions.loginSuccess());
    } else {
      yield put(fetchMessage({ value: 'Username and password do not match', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Login failed, please try again', error: true }));
  }
}

function* logoutUserWorker() {
  try {
    const response = yield call(logoutUser);
    if (response.status === 200) {
      yield put(actions.logoutSuccess());
      window.sessionStorage.removeItem('isAuthenticated');
    } else {
      //yield put(actions.authenticateFailure());
    }
  } catch (e) {
    //yield put(actions.authenticateFailure());
  }
}

const userSagas = [
  takeLatest(actions.LOGIN_USER, loginUserWorker),
  takeLatest(actions.LOGOUT_USER, logoutUserWorker),
];

export default userSagas;
