import { userConstants } from "../_constants";

const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        fetchingUser: true
      };

    case userConstants.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        fetchingUser: false,
        currentlyViewedUser: action.user
      };

    case userConstants.GET_SINGLE_USER_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        ownProfileFetchError: action.error
      };

    case userConstants.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        updatingProfile: true
      };

    case userConstants.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updatingProfile: false,
        profileUpdateSucceeded: true,
        ownProfile: action.payload.user
      };

    case userConstants.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        updatingProfile: false,
        profileUpdateStatus: action.status,
        error: action.error
      };

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
