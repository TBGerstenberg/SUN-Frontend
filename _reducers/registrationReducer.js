import { userConstants } from "../_constants";

const initialState = {
  registration: {
    email: "",
    password: "",
    registrationCompleted: false
  }
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.REGISTRATION_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.REGISTRATION_FAILURE:
      return {};
    default:
      return state;
  }
};

export default registrationReducer;
