import * as actions from '../actions/users';

const defaultState = {
  loggedIn: false,
  registerSuccess: false,
};

function users(state = {}, action) {
  switch (action.type) {
    case actions.LOGIN_USER:
      return Object.assign({}, state, {
        loggedIn: false,
      });
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    case actions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loggedOut: true,
        loggedIn: false,
      });
    case actions.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        registerSuccess: true,
      });
    default:
      return Object.assign({}, defaultState, state);
  }
}

export default users;
