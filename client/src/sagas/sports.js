import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/sports';
import { fetchSports, deleteSport, addSport, updateSport } from './apis/sports';


function* fetchSportsWorker() {
  try {
    const response = yield call(fetchSports);
    if (response.status === 200) {
      yield put(actions.fetchedSports(response.data));
      //fetch message
    } else {
      yield put(actions.fetchMessage({ value: 'Fetching activities failed', error: true }));
    }
  } catch (e) {
    yield put(actions.fetchMessage({ value: 'Fetching activities failed', error: true }));
  }
}

function* addSportWorker(action) {
  try {
    const response = yield call(addSport, action);
    if (response.status === 200) {
      yield put(actions.addedSport(action));
      yield put(actions.fetchSports());
      yield put(actions.fetchMessage({ value: 'New activity added', error: false }));
    } else {
      yield put(actions.fetchMessage({ value: 'Adding new activity failed', error: true }));
    }
  } catch (e) {
    yield put(actions.fetchMessage({ value: 'Adding new activity failed', error: true }));
  }
}

function* updateSportWorker(action) {
  try {
    const response = yield call(updateSport, action);
    if (response.status === 200) {
      yield put(actions.updatedSport(action));
      yield put(actions.fetchSports());
    } else {
      yield put(actions.fetchMessage({ value: 'Updating activity failed', error: true }));
    }
  } catch (e) {
    yield put(actions.fetchMessage({ value: 'Updating activity failed', error: true }));
  }
}

function* deleteSportWorker(action) {
  try {
    const response = yield call(deleteSport, action);
    if (response.status === 200) {
      yield put(actions.deletedSport(action));
      yield put(actions.fetchSports());
    } else {
      yield put(actions.fetchMessage({ value: 'Deleting activity failed', error: true }));
    }
  } catch (e) {
    yield put(actions.fetchMessage({ value: 'Deleting activity failed', error: true }));
  }
}

const sportSagas = [
  takeLatest(actions.FETCH_SPORTS, fetchSportsWorker),
  takeLatest(actions.DELETE_SPORT, deleteSportWorker),
  takeLatest(actions.ADD_SPORT, addSportWorker),
  takeLatest(actions.UPDATE_SPORT, updateSportWorker),

];

export default sportSagas;
