import * as axios from 'axios';

export function fetchSports() {
  const promise =
    axios.get('http://localhost:3001/sports/all', {
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
    axios.put('http://localhost:3001/sports/add/', {
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
    axios.put('http://localhost:3001/sports/update/', {
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
