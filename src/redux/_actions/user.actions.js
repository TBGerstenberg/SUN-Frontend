import { userService } from "../../services";
import { userConstants } from "../_constants";

/** ************************************************************************************
 *  User-related action creators that dispatch actions like network requests
 *  to the SUN-API and track their progress within redux, so that various components
 *  in the component tree can react to events regarding these operations.
 ****************************************************************************************/

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
      dispatch(
        success(registrationResponse.user, registrationResponse.authToken)
      );
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
  function success(user, token) {
    return {
      type: userConstants.REGISTRATION_SUCCESS,
      payload: { user: user, token: token }
    };
  }

  /**
   * Redux action creator triggered when a registration request failed with an error
   * @param {*} registrationResponse - HttpResponse Object describing the response for the failed request
   */
  function failure(registrationResponse) {
    return { type: userConstants.REGISTRATION_FAILURE, registrationResponse };
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

    if (loginResponse.status === 200) {
      dispatch(success(loginResponse.user, loginResponse.authToken));
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
  function success(user, authToken) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      payload: { user: user, token: authToken }
    };
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
  return async dispatch => {
    dispatch(request());

    const logoutResponse = await userService.logout();

    if (logoutResponse.status === 200) {
      dispatch(success(logoutResponse));
    } else {
      dispatch(failure(logoutResponse.error));
    }
  };

  /**
   * Redux action creator triggered when a logout-request is started
   */
  function request() {
    return { type: userConstants.LOGOUT_REQUEST };
  }

  /**
   * Redux action creator triggered when a login request succeeded
   */
  function success() {
    return { type: userConstants.LOGOUT_SUCCESS };
  }

  /**
   * Redux action creator triggered when a logout request failed with an error
   * @param {*} error - Error object thrown when creating the login request
   */
  function failure(error) {
    return { type: userConstants.LOGOUT_FAILURE, error };
  }
}

/**
 * Updates a users profile with a set of personal information
 * @param {object} profileValues - Object containing a set of properties used in each persons profile.
 *
 * Contained in the profilevalues Object:
 * @param {Number} userId - the public id of the profile that shall be updated
 * @param {String} title - the acadaemic or professional title of the user that attempts to complete his profile
 * @param {String} gender - the gender of the user that attempts to complete his profile - can be "male", "female" or "other",
 * @param {String} firstName - the first name of the user that attempts to complete his profile
 * @param {String} lastName - the last name of the user that attempts to complete his profile
 * @param {Date} dateOfBirth - an ISO-8601 Date string in the format YYYY-DD-MM describing the users date of birth
 * @param {Adress} Adress - an adress containg a cityName, postCode, street and houseNumber
 * @param {boolean} studentStatus  - flag indicating wether the user is a student or not.
 * @param {Date} immatriculationDate -
 * @param {Date} exmatriculationDate -
 * @param {Array of Numbers} chairs - Array of chairs that the user belongs to.
 */
function updateProfile(profileValues) {
  return async dispatch => {
    dispatch(request());

    const updateProfileResponse = await userService.updateProfile(
      profileValues
    );

    if (
      updateProfileResponse.response &&
      updateProfileResponse.response.status === 200
    ) {
      dispatch(success(updateProfileResponse.response.data));
    } else {
      dispatch(failure(updateProfileResponse.error));
    }
  };

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
    return {
      type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
      payload: { user }
    };
  }

  /**
   * Redux action creator triggered when a update-Profile-Request failed with an error
   * @param {*} error - Error object thrown when updating the profile
   */
  function failure(error) {
    return { type: userConstants.UPDATE_USER_PROFILE_FAILURE, error };
  }
}

/**
 * Fetches all users
 */
function getAllUsers() {
  return async dispatch => {
    dispatch(request());

    const getAllUsersResponse = await userService.getAllUsers();

    if (getAllUsersResponse && getAllUsersResponse.users) {
      dispatch(success(getAllUsersResponse.users));
    } else {
      dispatch(failure(getAllUsersResponse));
    }
  };

  function request() {
    return { type: userConstants.GETALL_USERS_REQUEST };
  }

  function success(users) {
    return { type: userConstants.GETALL_USERS_SUCCESS, users };
  }

  function failure(error) {
    return { type: userConstants.GETALL_USERS_FAILURE, error };
  }
}

/**
 * Fetches a single User
 */
function getSingleUser(userId) {
  return async (dispatch, getState) => {
    dispatch(request());

    const getSingleUserResponse = await userService.getSingleUser(userId);

    if (getSingleUserResponse && getSingleUserResponse.user) {
      dispatch(
        success(getSingleUserResponse.user, getSingleUserResponse.status)
      );
    } else {
      dispatch(failure(getSingleUserResponse));
    }
  };

  function request() {
    return { type: userConstants.GET_SINGLE_USER_REQUEST };
  }

  function success(user, status) {
    return { type: userConstants.GET_SINGLE_USER_SUCCESS, user, status };
  }

  function failure(error) {
    return { type: userConstants.GET_SINGLE_USER_FAILURE, error };
  }
}

/**
 * Fetches a session for the currently logged in user
 */
function getSession() {
  return async dispatch => {
    dispatch(request());

    const getSessionRequest = await userService.getSession();

    if (getSessionRequest && getSessionRequest.status === 200) {
      dispatch(
        success(getSessionRequest.data.account, getSessionRequest.data.token)
      );
    } else {
      dispatch(failure(getSessionRequest));
    }
  };

  function request() {
    return { type: userConstants.GET_SESSION_REQUEST };
  }

  function success(user, authToken) {
    return {
      type: userConstants.GET_SESSION_SUCCESS,
      payload: { user: user, token: authToken }
    };
  }

  function failure(error) {
    return { type: userConstants.GET_SESSION_FAILURE };
  }
}

/**
 * Requests to the delete the account with "accountId".
 */
function deleteAccount(accountId) {
  return async (dispatch, getState) => {
    dispatch(request());

    const deleteAccountRequest = await userService.deleteAccount(accountId);

    if (deleteAccountRequest && deleteAccountRequest.status === 200) {
      dispatch(success());
    } else {
      dispatch(failure(deleteAccountRequest.error));
    }
  };

  function request() {
    return { type: userConstants.DELETE_ACCOUNT_REQUEST };
  }

  function success(user) {
    return { type: userConstants.DELETE_ACCOUNT_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.DELETE_ACCOUNT_FAILURE, error };
  }
}

/**
 * Adds a subscription to a chair to the logged-in-user
 */
function addSubscription(subscription) {
  return {
    type: userConstants.ADD_SUBSCRIPTION,
    payload: { subscription: subscription }
  };
}

/**
 * Removes a subscription to a chair to the logged-in-user
 */
function removeSubscription(subscription) {
  return {
    type: userConstants.REMOVE_SUBSCRIPTION,
    payload: { subscription: subscription }
  };
}

/**
 * Updates the primary email of an acccount.
 * NOTE: This operation is implemented seperately from update-profile
 * as it may require additional security checks, like confirming with a password
 * that is not stored on the client side
 * @param {String} updatedEmail
 */
function updateAccountEmail(updatedEmail) {
  return {
    type: userConstants.UPDATE_ACCOUNT_EMAIL,
    payload: { updatedEmail: updatedEmail }
  };
}

const userActions = {
  register,
  login,
  getSession,
  logout,
  getAllUsers,
  getSingleUser,
  updateProfile,
  addSubscription,
  removeSubscription,
  deleteAccount,
  updateAccountEmail
};

export default userActions;
