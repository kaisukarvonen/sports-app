export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
