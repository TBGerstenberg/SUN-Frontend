import { userConstants } from "../_constants";

const initialState = {
  loggedIn: false
};

const attachRolesToUser = user => {
  let roles = [];
  if (user.isAdmin) {
    roles.push("ADMIN");
  }
  user.roles = roles;
  return user;
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_SUCCESS:
      //Tempoary workaround that changes the users admin status to an array containing his roles as strings
      // as this eases the auth filtering
      let user = action.payload.user;
      user = attachRolesToUser(user);

      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: user,
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
        user: attachRolesToUser(action.user, action.user.admin)
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
