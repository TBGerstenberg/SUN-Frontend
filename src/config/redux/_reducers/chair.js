import { chairConstants } from "../_constants";

const initialState = {};

const chairReducer = (state = initialState, action) => {
  switch (action.type) {
    case chairConstants.GET_CHAIRS_REQUEST:
      return {
        ...state,
        fetchingChairs: true
      };
    case chairConstants.GET_CHAIRS_SUCCESS:
      return {
        ...state,
        fetchingChairs: false,
        chairs: action.chairs
      };
    case chairConstants.GET_CHAIRS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default chairReducer;
