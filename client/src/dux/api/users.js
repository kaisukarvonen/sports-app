import * as axios from 'axios';
import { baseUrl } from '../config';

export function loginUser(action) {
  const promise =
    axios.put(`${baseUrl}/user/login`, {
      username: action.user.username,
      password: action.user.password,
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function authenticate() {
  const promise =
    axios.get(`${baseUrl}/user/authenticate`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function registerUser(action) {
  const promise =
    axios.put(`${baseUrl}/user/register`, {
      username: action.user.username,
      password: action.user.password,
      firstname: action.user.firstname,
      lastname: action.user.lastname,
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}
