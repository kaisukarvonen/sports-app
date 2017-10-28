import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/sports';
import { fetchSports, deleteSport } from './apis/sports';


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

function* deleteSportWorker(action) {
  try {
    const response = yield call(deleteSport, action);
    if (response.status === 200) {
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
];

export default function* rootSaga() {
  yield [
    sportSagas,
  ];
}
