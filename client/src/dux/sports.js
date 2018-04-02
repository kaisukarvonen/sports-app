import { takeLatest, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import * as api from './api/sports';

const FETCH_SPORTS = 'FETCH_SPORTS';
const FETCHED_SPORTS = 'FETCHED_SPORTS';
const SPORTS_MESSAGE = 'SPORTS_MESSAGE';
const DELETE_SPORT = 'DELETE_SPORT';
const DELETED_SPORT = 'DELETED_SPORT';
const ADD_SPORT = 'ADD_SPORT';
const ADDED_SPORT = 'ADDED_SPORT';
const UPDATED_SPORT = 'UPDATED_SPORT';
const UPDATE_SPORT = 'UPDATE_SPORT';

export const fetchSports = (start, end) => ({ type: FETCH_SPORTS, start, end });
export const addSport = sport => ({ type: ADD_SPORT, sport });
export const addedSport = sport => ({ type: ADDED_SPORT, sport });
export const updateSport = sport => ({ type: UPDATE_SPORT, sport });
export const updatedSport = sport => ({ type: UPDATED_SPORT, sport });
export const fetchedSports = sports => ({ type: FETCHED_SPORTS, sports });
export const fetchMessage = message => ({ type: SPORTS_MESSAGE, message });
export const deleteSport = sport => ({ type: DELETE_SPORT, sport });
export const deletedSport = sport => ({ type: DELETED_SPORT, sport });

const defaultState = {
  sports: [],
  message: undefined,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCHED_SPORTS:
      return { ...state, sports: action.sports };
    case SPORTS_MESSAGE:
      return { ...state, message: action.message };
    case ADDED_SPORT:
      return { ...state, sports: _.orderBy([...state.sports, action.sport], s => s.date, ['desc']) };
    case UPDATED_SPORT:
      return {
        ...state,
        sports: _.map(state.sports, (s) => {
          if (s._id === action.sport._id) {
            return action.sport;
          }
          return s;
        }),
      };
    case DELETED_SPORT: {
      const index = _.findIndex(state.sports, { _id: action.sport._id });
      const newSports = [...state.sports];
      newSports.splice(index, 1);
      return { ...state, sports: newSports };
    }
    default:
      return { ...state };
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
      yield put(addedSport(response.data));
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
      yield put(updatedSport(action.sport));
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
      yield put(deletedSport(action.sport));
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
