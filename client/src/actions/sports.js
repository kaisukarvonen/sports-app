export const FETCH_SPORTS = 'FETCH_SPORTS';
export const FETCHED_SPORTS = 'FETCHED_SPORTS';
export const FETCH_SPORTS_ERROR = 'FETCH_SPORTS_ERROR';
export const DELETE_SPORT = 'DELETE_SPORT';

export function fetchSports() {
  return {
    type: FETCH_SPORTS,
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
    type: FETCH_SPORTS_ERROR,
    errMessage,
  };
}

export function deleteSport(sport) {
  return {
    type: DELETE_SPORT,
    sport,
  };
}
