export const FETCH_SPORTS = 'FETCH_SPORTS';
export const FETCHED_SPORTS = 'FETCHED_SPORTS';
export const SPORTS_ERROR = 'SPORTS_ERROR';
export const DELETE_SPORT = 'DELETE_SPORT';
export const DELETED_SPORT = 'DELETED_SPORT';
export const ADD_SPORT = 'ADD_SPORT';
export const ADDED_SPORT = 'ADDED_SPORT';
export const UPDATE_SPORT = 'UPDATE_SPORT';
export const UPDATED_SPORT = 'UPDATED_SPORT';

export function fetchSports() {
  return {
    type: FETCH_SPORTS,
  };
}

export function addSport(sport) {
  return {
    type: ADD_SPORT,
    sport,
  };
}

export function addedSport(sport) {
  return {
    type: ADDED_SPORT,
    sport,
  };
}

export function updateSport(sport) {
  return {
    type: UPDATE_SPORT,
    sport,
  };
}

export function updatedSport(sport) {
  return {
    type: UPDATED_SPORT,
    sport,
  };
}

export function fetchedSports(sports) {
  return {
    type: FETCHED_SPORTS,
    sports,
  };
}

export function fetchError(errMessage) {
  return {
    type: SPORTS_ERROR,
    errMessage,
  };
}

export function deleteSport(sport) {
  return {
    type: DELETE_SPORT,
    sport,
  };
}

export function deletedSport(sport) {
  return {
    type: DELETED_SPORT,
    sport,
  };
}
