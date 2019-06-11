import { userConstants } from "../_constants";
import { userService } from "../../services";

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
      console.log(loginResponse);
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
 * @param {Adress} Adress - an adress containg a cityName, postalCode, streetName and houseNumber
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

    console.log(updateProfileResponse);
    if (updateProfileResponse.response.status === 200) {
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
    console.log(user);
    console.log("Updated User");
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
  return async dispatch => {
    dispatch(request());

    console.log("Fetching user with id " + userId + "In action creator layer");
    const getSingleUserResponse = await userService.getSingleUser(userId);

    if (getSingleUserResponse && getSingleUserResponse.user) {
      dispatch(success(getSingleUserResponse.user));
    } else {
      dispatch(failure(getSingleUserResponse));
    }
  };

  function request() {
    return { type: userConstants.GET_SINGLE_USER_REQUEST };
  }

  function success(user) {
    return { type: userConstants.GET_SINGLE_USER_SUCCESS, user };
  }

  function failure(error) {
    return { type: userConstants.UPDATE_USER_PROFILE_FAILURE, error };
  }
}

const userActions = {
  register,
  login,
  logout,
  getAllUsers,
  getSingleUser,
  updateProfile
};

export default userActions;
