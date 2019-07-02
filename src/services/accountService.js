import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Account> API.
 */
const accountService = {
  getAllAccounts: async accessToken => {
    try {
      const getAllaccountsResponse = await apiClient.get(
        API_CONFIG.ACCOUNT.GET_ALL_ACCOUNTS_URL
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

      // Perform the request
      const updateProfileResponse = await apiClient.put(
        API_CONFIG.ACCOUNT.EDIT_ACCCOUNT_URL + accountId,
        newAccountValues,
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

  deleteAccount: async accountId => {
    try {
      console.log("Deleting account with id " + accountId + "In service layer");
      // Perform the request
      const deleteSingleAccountResponse = await apiClient.delete(
        API_CONFIG.ACCOUNT.DELETE_ACCOUNT_URL(accountId)
      );

      console.log(deleteSingleAccountResponse);
      // Handle the response
      if (deleteSingleAccountResponse.status === 200) {
        console.log("Deleting Account succeeded");
        return {
          user: deleteSingleAccountResponse.data,
          error: null
        };
      }
    } catch (error) {
      return { users: null, error: error };
    }
  }
};

export default accountService;
