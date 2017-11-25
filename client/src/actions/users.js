export const LOGIN_USER = 'LOGIN_USER';

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
