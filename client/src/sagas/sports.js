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
      yield put(actions.fetchError('Fetching sports failed'));
    }
  } catch (e) {
    yield put(actions.fetchError('Fetching sports failed'));
  }
}

function* addSportWorker(action) {
  try {
    const response = yield call(addSport, action);
    if (response.status === 200) {
      yield put(actions.addedSport());
      yield put(actions.fetchSports());
    } else {
      yield put(actions.fetchError('Adding new activity failed'));
    }
  } catch (e) {
    yield put(actions.fetchError('Adding new activity failed'));
  }
}

function* updateSportWorker(action) {
  try {
    const response = yield call(updateSport, action);
    if (response.status === 200) {
      yield put(actions.updatedSport());
      yield put(actions.fetchSports());
    } else {
      yield put(actions.fetchError('Updating activity failed'));
    }
  } catch (e) {
    yield put(actions.fetchError('Updating activity failed'));
  }
}

function* deleteSportWorker(action) {
  try {
    const response = yield call(deleteSport, action);
    if (response.status === 200) {
      yield put(actions.deletedSport());
      yield put(actions.fetchSports());
    } else {
      yield put(actions.fetchError('Deleting activity failed'));
    }
  } catch (e) {
    yield put(actions.fetchError('Deleting activity failed'));
  }
}

const sportSagas = [
  takeLatest(actions.FETCH_SPORTS, fetchSportsWorker),
  takeLatest(actions.DELETE_SPORT, deleteSportWorker),
  takeLatest(actions.ADD_SPORT, addSportWorker),
  takeLatest(actions.UPDATE_SPORT, updateSportWorker),

];

export default function* rootSaga() {
  yield [
    sportSagas,
  ];
}
