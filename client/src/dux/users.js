import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './api/users';
import { fetchMessage } from '../dux/sports';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_USER = 'REGISTER_USER';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const AUTHENTICATED_USER = 'AUTHENTICATED_USER';

export const loginUser = user => ({ type: LOGIN_USER, user });
export const logout = () => ({ type: LOGOUT_USER });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerUser = user => ({ type: REGISTER_USER, user });
export const authenticate = () => ({ type: AUTHENTICATE_USER });
export const authenticated = value => ({ type: AUTHENTICATED_USER, value });


const defaultState = {
  registerSuccess: undefined,
  isAuthenticated: undefined,
};

export default function users(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case REGISTER_SUCCESS:
      return { ...state, registerSuccess: true };
    case AUTHENTICATE_USER:
      return { ...state, isAuthenticated: undefined };
    case AUTHENTICATED_USER:
      return { ...state, isAuthenticated: action.value };
    case LOGOUT_USER:
      return { ...state, isAuthenticated: false };
    default:
      return { ...defaultState, ...state };
  }
}


function* loginUserWorker(action) {
  try {
    const response = yield call(api.loginUser, action);
    if (response.status === 200) {
      window.sessionStorage.setItem('token', response.data.token);
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
      window.sessionStorage.setItem('token', response.token);
      yield put(fetchMessage({ value: 'New account has been created!', error: false }));
      yield put(registerSuccess());
    } else {
      yield put(fetchMessage({ value: 'Username is already in use, pick another one', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Registering new user account failed, please try again', error: true }));
  }
}

function* authenticateUserWorker() {
  if (window.sessionStorage.token === undefined) {
    yield put(authenticated(false));
  } else {
    try {
      const response = yield call(api.authenticate);
      if (response.status === 200) {
        yield put(authenticated(true));
      } else {
        yield put(authenticated(false));
      }
    } catch (e) {
      yield put(authenticated(false));
    }
  }
}

export const userSagas = [
  takeLatest(LOGIN_USER, loginUserWorker),
  takeLatest(REGISTER_USER, registerUserWorker),
  takeLatest(AUTHENTICATE_USER, authenticateUserWorker),
];
