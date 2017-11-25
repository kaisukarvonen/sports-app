export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

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
