import * as axios from 'axios';


export function loginUser(action) {
  const promise =
    axios.put('http://localhost:3001/user/login', {
      username: action.user.username,
      password: action.user.password,
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function authenticate() {
  const promise =
    axios.get('http://localhost:3001/user/authenticate', {
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
    axios.put('http://localhost:3001/user/register', {
      username: action.user.username,
      password: action.user.password,
      firstname: action.user.firstname,
      lastname: action.user.lastname,
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}
