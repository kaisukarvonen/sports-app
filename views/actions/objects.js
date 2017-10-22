export const FETCH_OBJECTS = 'FETCH_OBJECTS';
export const FETCHED_OBJECTS = 'FETCHED_OBJECTS';
export const FETCH_OBJECTS_ERROR = 'FETCH_OBJECTS_ERROR';

export function fetchObjects() {
  console.log('in action fetchObjects');
  return {
    type: FETCH_OBJECTS,
  };
}

export function fetchedObjects(objects) {
  return {
    type: FETCHED_OBJECTS,
    objects,
  };
}

export function fetchError(errMessage) {
  return {
    type: FETCH_OBJECTS_ERROR,
    errMessage,
  };
}
