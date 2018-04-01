import * as axios from 'axios';
import { baseUrl } from '../config';

export function fetchSports(action) {
  const promise =
    axios.get(`${baseUrl}/sports/all?start=${action.start}&end=${action.end}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
    })
      .then(response => response)
      .catch(error => error);

  return promise;
}

export function addSport(action) {
  const promise =
    axios.put(`${baseUrl}/sports/add/`, {
      activityName: action.sport.activityName,
      date: action.sport.date,
      duration: action.sport.duration,
      comments: action.sport.comments,
    },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
    },
    )
      .then(response => response)
    .catch(error => error);
  return promise;
}


export function updateSport(action) {
  console.log(action.sport);
  const promise =
    axios.put(`${baseUrl}/sports/update/`, {
      id: action.sport._id,
      comments: action.sport.comments,
    })
      .then(response => response)
      .catch(error => error);
  return promise;
}



export function deleteSport(action) {
  const promise =
    axios.delete(`${baseUrl}/sports/delete/${action.sport._id}`)
      .then(response => response)
      .catch(error => error);
  return promise;
}
