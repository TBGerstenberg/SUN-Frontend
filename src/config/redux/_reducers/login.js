import { userConstants } from "../_constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      loggedIn: true,
      user
    }
  : {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.email
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loginError: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginReducer;
