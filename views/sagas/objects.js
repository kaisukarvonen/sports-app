import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions/objects';
import { fetchObjects } from './apis/objects';


// worker Saga performing the async fetch task
function* fetchObjectsWorker(action) {

  try {
    const objects = yield call(fetchObjects, action); //call API request function
    if (objects.status === 200) { //fetch was successful
      yield put(actions.fetchedObjects(objects.data));
    } else { //in case of error
      yield put(actions.fetchError('Fetching data failed'));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchFetchObjects() {
  yield* takeLatest(actions.FETCH_OBJECTS, fetchObjectsWorker);
}


export default function* rootSaga() {
  yield [
    watchFetchObjects()
  ]
}
