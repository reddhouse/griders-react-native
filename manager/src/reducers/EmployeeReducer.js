import {
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      // Return data as it was delivered from Firebase. We are not using any
      // arrays, so future editing of existing data will be easy, using the
      // unique ID of the different "items" in our database. For example:
      // return { ...state, [id]: action.payload }
      return action.payload;
    default:
      return state;
  }
};
