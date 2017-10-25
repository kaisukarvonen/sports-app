import * as axios from 'axios';

//api request
export function fetchObjects(action) {
   console.log('saga-api: '+action.type);
  const promise =
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response)
    .catch(error => error);

  return promise;
}
