import { combineReducers } from 'redux';
import * as actions from '../actions/objects';

const defaultState = {
  objects: [],
};

function objects(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case actions.FETCHED_OBJECTS:
      return Object.assign({}, state, {
        objects: action.objects,
      });
    case actions.FETCH_OBJECTS_ERROR:
      return Object.assign({}, state, {
        error: action.errMessage,
      });
    default:
      return Object.assign({}, defaultState, state);
  }
}


const rootReducer = combineReducers({
  objects,
});
export default rootReducer;
