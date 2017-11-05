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
      comments: action.sport.comments,
    })
      .then(response => response)
      .catch(error => error);
  return promise;
}


export function updateSport(action) {
  console.log(action.sport);
  const promise =
    axios.put('/sports/update/', {
      id: action.sport._id,
      comments: action.sport.comments,
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
