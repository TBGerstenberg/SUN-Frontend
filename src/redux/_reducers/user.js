import { userConstants } from "../_constants";

/***************************************************************
 * Redux reducer that reacts to user-related redux-actions dispatched
 * by one or more action creatos and changes the application state accordingly.
 * This reducer handles application state that contains users other than
 * the one currently logged in.
 * Each reducer represents a first-level node in the application state
 * that is represented as a tree of JS-objects. This reducer manages
 * the first-level node called "user" and all objects nested in
 * lower levels of the state tree below the "user"-node.
 * The below "initialstate" is used to define how the state-tree
 * managed by this reducer looks like when initialized.
 **************************************************************/

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
        currentlyViewedUser: action.user,
        userFetchStatus: action.status
      };

    case userConstants.GET_SINGLE_USER_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        userFetchError: action.error,
        userFetchStatus: action.error.error.response.status
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
