import { userConstants } from "../_constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      loggedIn: true,
      user
    }
  : {
      loggedIn: false
    };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.payload.user,
        accessToken: action.payload.token
      };

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.email
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginReducer;
