import axios from "axios";
import API_CONFIG from "../config/api_config";

const userService = {
  login: () => {},

  logout: () => {},

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
      const signupResponse = await axios.post(
        API_CONFIG.REGISTRATION.POST_LOGIN_URL
      );

      if (signupResponse && signupResponse.user) {
        return { user: signupResponse.user, error: null };
      }
    } catch (error) {
      return { user: null, error: error };
    }
  }
};

export default userService;
