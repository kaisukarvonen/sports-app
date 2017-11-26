import * as axios from 'axios';

export function loginUser(action) {
  const promise =
    axios.put('/user/login', {
      username: action.user.username,
      password: action.user.password,
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function logoutUser() {
  const promise =
    axios.get('/user/logout')
      .then(response => response)
      .catch(error => error);

  return promise;
}
