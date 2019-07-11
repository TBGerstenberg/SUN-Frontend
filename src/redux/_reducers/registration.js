import { userConstants } from "../_constants";

/***************************************************************
 * Redux reducer that reacts to registration-related redux-actions dispatched
 * by one or more action creatos and changes the application state accordingly.
 * Each reducer represents a first-level node in the application state
 * that is represented as a tree of JS-objects. This reducer manages
 * the first-level node called "registration" and all objects nested in
 * lower levels of the state tree below the "registration"-node.
 * The below "initialstate" is used to define how the state-tree
 * managed by this reducer looks like when initialized.
 **************************************************************/

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
