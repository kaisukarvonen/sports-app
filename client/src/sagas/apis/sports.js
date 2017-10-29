import * as axios from 'axios';

export function fetchSports() {
  const promise =
    axios.get('/sports/all')
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function addSport(action) {
  console.log(action.sport);
  const promise =
    axios.put('/sports/add/', {
      activityName: action.sport.activityName,
      date: action.sport.date,
      duration: action.sport.duration,
      details: action.sport.details,
    })
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
