import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Account> API.
 */
const accountService = {
  /**
   * Fetches all Accounts within the system
   */
  getAllAccounts: async () => {
    try {
      const getAllaccountsResponse = await apiClient.get(
        API_CONFIG.ACCOUNT.GET_ALL_ACCOUNTS_URL
      );
      return getAllaccountsResponse;
    } catch (error) {
      return error;
    }
  },

  /**
   * Updates an existing account with the values given in newAccountValues
   * @param {Object} newAccountValues - JS Object containting Account information
   * @param {Number} accountId - Unique ID of the account to update
   * @see /src/models/account
   */
  editAccount: async (newAccountValues, accountId) => {
    try {
      //Build request headers
      const headers = {
        Authorization: "SOMETOKEN"
      };

      // Perform the request
      const updateAccountResponse = await apiClient.put(
        API_CONFIG.ACCOUNT.EDIT_ACCCOUNT_URL + accountId,
        newAccountValues,
        headers
      );

      // Handle the response
      if (updateAccountResponse.status === 200) {
        return {
          response: updateAccountResponse,
          error: null,
          updateAccountStatus: updateAccountResponse.status
        };
      }
    } catch (error) {
      return { response: null, error: error.response };
    }
  },

  /**
   * Deletes an existing account
   * @param {Number} accountId - Unique ID of the account to delete
   * @see /src/models/account
   */
  deleteAccount: async accountId => {
    try {
      // Perform the request
      const deleteSingleAccountResponse = await apiClient.delete(
        API_CONFIG.ACCOUNT.DELETE_ACCOUNT_URL(accountId)
      );
      return deleteSingleAccountResponse;
    } catch (error) {
      return error;
    }
  }
};

export default accountService;
