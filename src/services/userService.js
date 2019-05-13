import axios from "axios";
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
   * Issues an HTTP-POST request to Auth-API (config.login.POST_LOGIN_URL)
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

      console.log(
        "Issuing a login request with " +
          postLoginRequestBody.email +
          " and " +
          postLoginRequestBody.password +
          "to " +
          API_CONFIG.LOGIN.POST_LOGIN_URL
      );

      // Perform the http request
      const LoginResponse = await axios.post(
        API_CONFIG.LOGIN.POST_LOGIN_URL,
        postLoginRequestBody
      );

      // Handle the response
      if (LoginResponse) {
        if (LoginResponse.status() === 200 && LoginResponse.user)
          return {
            authToken: LoginResponse.token,
            user: LoginResponse.account,
            status: LoginResponse.status,
            error: null
          };
        else {
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
   * Issues an HTTP-GET request to Auth-API (config.login.GET_LOGOUT_URL)
   * that logs out the currently authenticated user.
   * @param {string} token - The access token that shall be invalidated
   */
  logout: async token => {
    // Build http headers
    const logoutHttpHeaders = {
      headers: { Authorization: "bearer " + token }
    };

    try {
      // Perform the http request
      const logoutResponse = await axios.get(
        API_CONFIG.LOGIN.GET_LOGOUT_URL,
        logoutHttpHeaders
      );
      return logoutResponse;
    } catch (error) {}
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
        password: password,
        consentToDataProcessingAgreement: consentToDataProcessingAgreement,
        consentToTermsOfService: consentToTermsOfService
      };

      console.log(
        "Issuing a login request with " +
          registrationRequestBody.email +
          " and " +
          registrationRequestBody.password +
          " and consent to data processing: " +
          consentToDataProcessingAgreement +
          " and Consent to terms of service: " +
          consentToTermsOfService +
          "to " +
          API_CONFIG.REGISTRATION.POST_REGISTRATION_URL
      );

      // Perform the request
      const signupResponse = await axios.post(
        API_CONFIG.REGISTRATION.POST_REGISTRATION_URL,
        registrationRequestBody
      );

      // Handle the response
      if (signupResponse) {
        if (signupResponse.status() === 201 && signupResponse.user)
          return {
            authToken: signupResponse.token,
            user: signupResponse.account,
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
   * @param {String} firstName - the first name of the user that attempts to complete his profile
   * @param {String} lastName - the last name of the user that attempts to complete his profile
   * @param {String} title - the acadaemic or professional title of the user that attempts to complete his profile
   * @param {String} gender - the gender of the user that attempts to complete his profile - can be "male", "female" or "other",
   * @param {Date} birthDate - an ISO-8601 Date string in the format YYYY-DD-MM describing the users date of birth
   * @param {boolean} studentStatus  - flag indicating wether the user is a student or not.
   * @param {Array of Numbers} chairs - Array of chairs that the user belongs to.
   */
  updateProfile: async (
    firstName,
    lastName,
    title,
    gender,
    birthDate,
    address,
    studentStatus,
    chairs
  ) => {
    try {
      //Build request headers
      const headers = {
        Authorization: "SOMETOKEN"
      };

      //Build request Body
      const updateProfileRequestBody = {
        firstName: firstName,
        lastName: lastName,
        title: title,
        gender: gender,
        birthDate: birthDate,
        address: address,
        studentStatus: studentStatus,
        chairs: chairs
      };

      // Perform the request
      const updateProfileResponse = await axios.put(
        API_CONFIG.USERS.UPDATE_PROFILE_URL,
        updateProfileRequestBody,
        headers
      );

      // Handle the response
      if (updateProfileResponse.status === 200) {
        return {
          user: updateProfileResponse.person,
          error: null
        };
      }
    } catch (error) {
      return { user: null, error: error };
    }
  }
};

export default userService;
