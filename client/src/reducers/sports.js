import { combineReducers } from 'redux';
import * as actions from '../actions/sports';

const defaultState = {
  sports: [],
};

function sports(state = {}, action) {
  switch (action.type) {
    case actions.FETCHED_SPORTS:
      return Object.assign({}, state, {
        sports: action.sports,
      });
    case actions.FETCH_SPORTS_ERROR:
      return Object.assign({}, state, {
        error: action.errMessage,
      });
    case actions.DELETE_SPORT:
      const newState = Object.assign({}, state);
      const indexOfSportToDelete = state.sports.findIndex(sport => {
        return sport._id === action.sport._id
      });
      newState.sports.splice(indexOfSportToDelete, 1);
      return newState;
    case actions.ADD_SPORT:
      return Object.assign({}, state, state.sports.push(action.sport));
    default:
      return Object.assign({}, defaultState, state);
  }
}


const rootReducer = combineReducers({
  sports,
});
export default rootReducer;
