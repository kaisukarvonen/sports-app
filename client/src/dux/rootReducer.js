import { combineReducers } from 'redux';
import sports from './sports';
import users from './users';

const rootReducer = combineReducers({
  sports,
  users,
});
export default rootReducer;
