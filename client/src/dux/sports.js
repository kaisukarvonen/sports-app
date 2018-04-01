import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './api/sports';

const FETCH_SPORTS = 'FETCH_SPORTS';
const FETCHED_SPORTS = 'FETCHED_SPORTS';
const SPORTS_MESSAGE = 'SPORTS_MESSAGE';
const DELETE_SPORT = 'DELETE_SPORT';
const ADD_SPORT = 'ADD_SPORT';
const UPDATE_SPORT = 'UPDATE_SPORT';

export const fetchSports = (start, end) => ({ type: FETCH_SPORTS, start, end });
export const addSport = sport => ({ type: ADD_SPORT, sport });
export const updateSport = sport => ({ type: UPDATE_SPORT, sport });
export const fetchedSports = sports => ({ type: FETCHED_SPORTS, sports });
export const fetchMessage = message => ({ type: SPORTS_MESSAGE, message });
export const deleteSport = sport => ({ type: DELETE_SPORT, sport });

const defaultState = {
  sports: [],
  message: undefined,
};

export default function (state = {}, action) {
  switch (action.type) {
    case FETCHED_SPORTS:
      return { ...state, sports: action.sports };
    case SPORTS_MESSAGE:
      return { ...state, message: action.message };
    default:
      return { ...defaultState, ...state };
  }
}

function* fetchSportsWorker(action) {
  try {
    const response = yield call(api.fetchSports, action);
    if (response.status === 200) {
      yield put(fetchedSports(response.data));
    } else {
      yield put(fetchMessage({ value: 'Fetching activities failed', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Fetching activities failed', error: true }));
  }
}

function* addSportWorker(action) {
  try {
    const response = yield call(api.addSport, action);
    if (response.status === 200) {
      // yield put(fetchSports());
      yield put(fetchMessage({ value: 'New activity added', error: false }));
    } else {
      yield put(fetchMessage({ value: 'Adding new activity failed', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Adding new activity failed', error: true }));
  }
}

function* updateSportWorker(action) {
  try {
    const response = yield call(api.updateSport, action);
    if (response.status === 200) {
      // yield put(fetchSports());
    } else {
      yield put(fetchMessage({ value: 'Updating activity failed', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Updating activity failed', error: true }));
  }
}

function* deleteSportWorker(action) {
  try {
    const response = yield call(api.deleteSport, action);
    if (response.status === 200) {
      // yield put(fetchSports());
    } else {
      yield put(fetchMessage({ value: 'Deleting activity failed', error: true }));
    }
  } catch (e) {
    yield put(fetchMessage({ value: 'Deleting activity failed', error: true }));
  }
}

export const sportSagas = [
  takeLatest(FETCH_SPORTS, fetchSportsWorker),
  takeLatest(DELETE_SPORT, deleteSportWorker),
  takeLatest(ADD_SPORT, addSportWorker),
  takeLatest(UPDATE_SPORT, updateSportWorker),
];
