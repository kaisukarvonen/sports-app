import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import { loginUser } from './apis/users';
import { fetchMessage } from '../actions/sports';


function* loginUserWorker(action) {
  try {
    const response = yield call(loginUser, action);
    console.log(response);
    if (response.status === 200) {
      yield put(actions.loginSuccess());
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
