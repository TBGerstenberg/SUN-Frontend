import { userConstants } from "../_constants";

const initialState = {
  registration: {
    registering: false,
    userToBeRegistered: null,
    registrationCompleted: false
  }
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_REQUEST:
      return {
        registering: true,
        userToBeRegistered: action.user
      };
    case userConstants.REGISTRATION_SUCCESS:
      return {
        registering: false,
        registeredUser: action.payload.user.email,
        registrationCompleted: true
      };
    case userConstants.REGISTRATION_FAILURE:
      return {
        registering: false,
        registeredUser: null,
        registrationCompleted: false,
        registrationResponseError: action.registrationResponse.error
      };
    default:
      return state;
  }
};

export default registrationReducer;
