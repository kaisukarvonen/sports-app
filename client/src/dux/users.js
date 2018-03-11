import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './api/users';
import { fetchMessage } from '../dux/sports';

const LOGIN_USER = 'LOGIN_USER';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const REGISTER_USER = 'REGISTER_USER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const loginUser = user => ({ type: LOGIN_USER, user });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const logout = () => ({ type: LOGOUT_USER });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerUser = user => ({ type: REGISTER_USER, user });

const defaultState = {
  loggedIn: false,
  registerSuccess: false,
};

export default function users(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loggedIn: false };
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggedOut: true, loggedIn: false };
    case REGISTER_SUCCESS:
      return { ...state, registerSuccess: true };
    default:
      return { ...defaultState, ...state };
  }
}


function* loginUserWorker(action) {
  try {
    const response = yield call(api.loginUser, action);
    if (response.status === 200) {
      // console.log(window.sessionStorage.getItem('isAuthenticated'));
      // window.sessionStorage.setItem('isAuthenticated', 'true');
      // console.log(window.sessionStorage.getItem('isAuthenticated'));
      yield put(loginSuccess());
    } else {
      yield put(fetchMessage({ value: 'Username and password do not match', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Login failed, please try again', error: true }));
  }
}

function* registerUserWorker(action) {
  try {
    const response = yield call(api.registerUser, action);
    if (response.status === 200) {
      yield put(fetchMessage({ value: 'New account has been created!', error: false }));
      yield put(registerSuccess());
    } else {
      yield put(fetchMessage({ value: 'Username is already in use, pick another one', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Registering new user account failed, please try again', error: true }));
  }
}

function* logoutUserWorker() {
  try {
    const response = yield call(api.logoutUser);
    if (response.status === 200) {
      yield put(logoutSuccess());
      //window.sessionStorage.removeItem('isAuthenticated');
    } else {
      //yield put(actions.authenticateFailure());
    }
  } catch (e) {
    //yield put(actions.authenticateFailure());
  }
}

export const userSagas = [
  takeLatest(LOGIN_USER, loginUserWorker),
  takeLatest(LOGOUT_USER, logoutUserWorker),
  takeLatest(REGISTER_USER, registerUserWorker),
];
