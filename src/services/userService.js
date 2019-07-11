import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Account> and <Person> API.
 */
const userService = {
  /*
   * @typedef {Object} LoginResponse
   * @property {string} authToken - The access token used to identify the issuer of a request to the backend.
   * @property {object} account - The account that has been logged in
   * @property {object} user - The person associated with the account that has been logged in
   * @propery {number} status - The http-status of the login-attempt
   *
   */

  /**
   * Issues a HTTP-POST request to Auth-API (config.login.POST_LOGIN_URL)
   * @param email - Email of the user that shall be logged in
   * @param password - Password of the user that shall be logged in
   * @return {LoginResponse}
   */
  login: async (email, password) => {
    try {
      // Build the request body
      const postLoginRequestBody = {
        email: email,
        password: password
      };

      // Perform the http request
      const LoginResponse = await apiClient.post(
        API_CONFIG.LOGIN.POST_LOGIN_URL,
        postLoginRequestBody
      );

      // Handle the response
      if (LoginResponse) {
        if (LoginResponse.status === 200) {
          return {
            authToken: LoginResponse.data.token,
            user: LoginResponse.data.account,
            status: LoginResponse.status,
            error: null
          };
        } else {
          return {
            authToken: null,
            user: null,
            status: LoginResponse.status,
            error: null
          };
        }
      }
    } catch (error) {
      return { authToken: null, user: null, status: null, error: error };
    }
  },

  /**
   * Issues a HTTP-GET request to Auth-API (config.login.GET_SESSION_URL)
   * that refreshes the session of a given user
   */
  getSession: async () => {
    try {
      // Perform the request
      const getSessionRequest = await apiClient.get(
        API_CONFIG.LOGIN.GET_SESSION_URL
      );

      // Handle the response
      if (getSessionRequest.status === 200) {
        return getSessionRequest;
      }
    } catch (error) {
      return error;
    }
  },

  /**
   * Issues an HTTP-GET request to Auth-API (config.login.GET_LOGOUT_URL)
   * that logs out the currently authenticated user.
   * @param {string} token - The access token that shall be invalidated
   */
  logout: async () => {
    let logoutResponse;
    try {
      // Perform the http request
      logoutResponse = await apiClient.get(API_CONFIG.LOGIN.GET_LOGOUT_URL);
      return logoutResponse;
    } catch (error) {
      return { error: error };
    }
  },

  /**
   * Performs an HTTP-Post Request to the Signup-API, creating a new user-account
   * @param email - Email adress that shall be registered
   * @param password - Password that shall be set for the new user
   * @param consentToDataProcessingAgreement - Flag indicating that the newly registered user agreed to the dataprocessing-agreement when registering his account
   * @param consentToTermsOfService - Flag indicating that the newly registered user agreed to the terms of service when registering his account
   */
  signup: async (
    email,
    password,
    consentToDataProcessingAgreement,
    consentToTermsOfService
  ) => {
    try {
      // Build the request body
      const registrationRequestBody = {
        email: email,
        password: password
        //consentToDataProcessingAgreement: consentToDataProcessingAgreement,
        //consentToTermsOfService: consentToTermsOfService
      };

      // Perform the request
      const signupResponse = await apiClient.post(
        API_CONFIG.REGISTRATION.POST_REGISTRATION_URL,
        registrationRequestBody
      );

      // Handle the response
      if (signupResponse) {
        if (signupResponse.status === 200)
          return {
            authToken: signupResponse.data.token,
            user: signupResponse.data.account,
            status: signupResponse.status,
            error: null
          };
        else {
          return {
            authToken: null,
            user: null,
            status: signupResponse.status,
            error: null
          };
        }
      }
    } catch (error) {
      return { user: null, error: error };
    }
  },

  /**
   * Updates a users profile with a set of personal information
   * @param {object} Profile - a userprofile containg data about a user. In detail, the following properties are accepted:
   *
   * @param {Number} userId - the public id of the profile that shall be updated
   * @param {String} firstName - the first name of the user that attempts to complete his profile
   * @param {String} lastName - the last name of the user that attempts to complete his profile
   * @param {String} title - the acadaemic or professional title of the user that attempts to complete his profile
   * @param {String} gender - the gender of the user that attempts to complete his profile - can be "male", "female" or "other",
   * @param {Date} birthDate - an ISO-8601 Date string in the format YYYY-DD-MM describing the users date of birth
   * @param {Object} address - Object containing a cityName, postCode, StreetName and HouseNumber
   * @param {Object} studentStatus  - Object Containing a StudentId ("Matrikelnummer"), courseOfStudy, enrollmentDate and deregistrationDate
   * @param {Array of Numbers} chairs - Array of chairs that the user belongs to.
   * @param {Array of Objects} skills - catalogue of skills conating a skillName (String) and a skillRating (number, 0-5)
   */
  updateProfile: async profile => {
    try {
      //Build request headers
      const headers = {
        Authorization: "SOMETOKEN"
      };

      //Build request Body
      const updateProfileRequestBody = {
        title: profile.title,
        gender: profile.gender,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate,
        address: profile.address,
        studentStatus: profile.studentStatus,
        chairs: profile.chairs,
        skills: profile.skills
      };

      // Perform the request
      const updateProfileResponse = await apiClient.put(
        API_CONFIG.USERS.UPDATE_PROFILE_URL + profile.userId,
        updateProfileRequestBody,
        headers
      );

      // Handle the response
      if (updateProfileResponse.status === 200) {
        return {
          response: updateProfileResponse,
          error: null
        };
      }
    } catch (error) {
      return { response: null, error: error };
    }
  },

  /**
   * Fetches all Users known within the system.
   */
  getAllUsers: async () => {
    try {
      // Perform the request
      const getAllUsersResponse = await apiClient.get(
        API_CONFIG.USERS.GET_ALL_USERS_URL
      );

      // Handle the response
      if (getAllUsersResponse.status === 200) {
        return {
          users: getAllUsersResponse.data,
          error: null
        };
      }
    } catch (error) {
      return { users: null, error: error };
    }
  },

  /**
   * Fetches a single user identified by his userId
   * @param {Number} userId unique identifier of the user to fetch
   */
  getSingleUser: async userId => {
    try {
      // Perform the request
      const getSingleUserResponse = await apiClient.get(
        API_CONFIG.USERS.GET_SINGLE_USER_URL(userId)
      );

      // Handle the response
      if (getSingleUserResponse.status === 200) {
        return {
          user: getSingleUserResponse.data,
          status: getSingleUserResponse.status,
          error: null
        };
      }
    } catch (error) {
      return { users: null, error: error };
    }
  }
};

export default userService;
