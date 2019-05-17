import { userConstants } from "../_constants";
import { userService } from "../../../services";

/**
 * Isses a Registration request, tracking its progress and status in the redux store by dispatching actions
 * @param email - Email adress that shall be registered
 * @param password - Password that shall be set for the new user
 * @param consentToDataProcessingAgreement - Flag indicating that the newly registered user agreed to the dataprocessing-agreement when registering his account
 * @param consentToTermsOfService - Flag indicating that the newly registered user agreed to the terms of service when registering his account
 */
function register({
  email,
  password,
  consentToDataProcessingAgreement,
  consentToTermsOfService
}) {
  return async dispatch => {
    dispatch(request({ email }));

    const registrationResponse = await userService.signup(
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

/**
 * Updates a users profile with a set of personal information
 * @param {String} firstName - the first name of the user that attempts to complete his profile
 * @param {String} lastName - the last name of the user that attempts to complete his profile
 * @param {String} title - the acadaemic or professional title of the user that attempts to complete his profile
 * @param {String} gender - the gender of the user that attempts to complete his profile - can be "male", "female" or "other",
 * @param {Date} birthDate - an ISO-8601 Date string in the format YYYY-DD-MM describing the users date of birth
 * @param {boolean} studentStatus  - flag indicating wether the user is a student or not.
 * @param {Array of Numbers} chairs - Array of chairs that the user belongs to.
 */
function updateProfile(
  firstName,
  lastName,
  title,
  gender,
  birthDate,
  address,
  studentStatus,
  employeeStatus,
  chairs
) {
  return async dispatch => {};

  /**
   * Redux action creator triggered when an update-Profile-request is started
   * @param {string - email-Format} email - email of the user that is attempting to update his profile
   */
  function request(email) {
    return { type: userConstants.UPDATE_USER_PROFILE_REQUEST, email };
  }

  /**
   * Redux action creator triggered when an update-Profile-request succeeded
   * @param {Object} user - user profile that has successfully been updated
   */
  function success(user) {
    return { type: userConstants.UPDATE_USER_PROFILE_SUCCESS, user };
  }

  /**
   * Redux action creator triggered when a update-Profile-Request failed with an error
   * @param {*} error - Error object thrown when updating the profile
   */
  function failure(error) {
    return { type: userConstants.UPDATE_USER_PROFILE_FAILURE, error };
  }
}

const userActions = {
  register,
  login,
  logout,
  updateProfile
};

export default userActions;
