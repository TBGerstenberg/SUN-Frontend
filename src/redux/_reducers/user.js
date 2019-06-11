import { userConstants } from "../_constants";

const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GETALL_USERS_REQUEST:
      return {
        ...state,
        fetchingUsers: true
      };
    case userConstants.GETALL_USERS_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        users: action.users
      };
    case userConstants.GET_CHAIRS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default userReducer;
