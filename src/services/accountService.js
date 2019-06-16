import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Account> API.
 */
const accountService = {
  getAllAccounts: async accessToken => {
    const headers = {
      Authorization: accessToken
    };

    try {
      const getAllaccountsResponse = await apiClient.get(
        API_CONFIG.ACCOUNT.GET_ALL_ACCOUNTS_URL,
        {
          headers: headers
        }
      );
      return getAllaccountsResponse;
    } catch (error) {
      return error;
    }
  },

  editAccount: async (newAccountValues, accountId) => {
    try {
      //Build request headers
      const headers = {
        Authorization: "SOMETOKEN"
      };

      //Build request Body
      const editAccountRequestBody = {
        email: newAccountValues.email,
        password: newAccountValues.password,
        admin: newAccountValues.admin
      };

      // Perform the request
      const updateProfileResponse = await apiClient.put(
        API_CONFIG.ACCOUNT.EDIT_ACCCOUNT_URL + accountId,
        editAccountRequestBody,
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

  deleteAccount: async () => {}
};

export default accountService;
