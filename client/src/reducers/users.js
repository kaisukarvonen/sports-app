import * as actions from '../actions/users';

const defaultState = {
  validUser: false,
};

function users(state = {}, action) {
  switch (action.type) {
    case actions.LOGIN_USER:
      return Object.assign({}, state, {
        validUser: false,
      });
    case actions.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        validUser: true,
      });
    default:
      return Object.assign({}, defaultState, state);
  }
}

export default users;
