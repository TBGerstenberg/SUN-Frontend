import { userConstants } from "../_constants";
import { userService } from "../../../services";

const userActions = {
  register,
  login,
  logout
};

/**
 * Isses a Registration request, tracking its progress and status in the redux store by dispatching actions
 * @param email - Email adress that shall be registered
 * @param password - Password that shall be set for the new user
 * @param consentToDataProcessingAgreement - Flag indicating that the newly registered user agreed to the dataprocessing-agreement when registering his account
 * @param consentToTermsOfService - Flag indicating that the newly registered user agreed to the terms of service when registering his account
 */
function register(
  email,
  password,
  consentToDataProcessingAgreement,
  consentToTermsOfService
) {
  return async dispatch => {
    dispatch(request({ email }));

    const registrationResponse = await userService.register(
      email,
      password,
      consentToDataProcessingAgreement,
      consentToTermsOfService
    );

    if (registrationResponse && registrationResponse.user) {
      dispatch(success(registrationResponse.user));
    } else {
      dispatch(failure(registrationResponse));
    }
  };

  /**
   * Redux action creator triggered when a registration-request is started
   * @param {string - email-Format} email - email of the user that is attempting to register
   */
  function request(email) {
    return { type: userConstants.REGISTRATION_REQUEST, email };
  }

  /**
   * Redux action creator triggered when a registration request succeeded
   * @param {Object} user - User that has been registered
   */
  function success(user) {
    return { type: userConstants.REGISTRATION_SUCCESS, user };
  }

  /**
   * Redux action creator triggered when a registration request failed with an error
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: userConstants.REGISTRATION_FAILURE, error };
  }
}

/**
 * Dispatches a login request, writing it's progess (requested, sucess, failure)
 * to the redux-store.
 * @param {*} email
 * @param {*} password
 */
function login({ email, password }) {
  return async dispatch => {
    dispatch(request({ email }));

    const loginResponse = await userService.login(email, password);

    if (loginResponse && loginResponse.user) {
      dispatch(success(loginResponse.user));
    } else {
      dispatch(failure(loginResponse));
    }
  };

  /**
   * Redux action creator triggered when a login-request is started
   * @param {string - email-Format} email - email of the user that is attempting to log in
   */
  function request(email) {
    return { type: userConstants.LOGIN_REQUEST, email };
  }

  /**
   * Redux action creator triggered when a login request succeeded
   * @param {Object} user - User that has been logged in
   */
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  /**
   * Redux action creator triggered when a login request failed with an error
   * @param {*} error - Error object thrown when creating the login request
   */
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

/**
 * Dispatches a logout request
 */
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export default userActions;
