import * as axios from 'axios';

export function fetchSports() {
  const promise =
    axios.get('/sports/all')
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function deleteSport(action) {
  const promise =
    axios.delete(`/sports/delete/${action.sport._id}`)
      .then(response => response)
      .catch(error => error);
  return promise;
}
