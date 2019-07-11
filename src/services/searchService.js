import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Search> API.
 */
const searchService = {
  /**
   * Performs a search request to search the backend for the given query.
   * Exact semantics of the search can be seen in the Service-Documentation.
   * @param {string} query - The keywords / string that shall be searched for.
   */
  search: async query => {
    try {
      const searchResponse = await apiClient.get(
        API_CONFIG.SEARCH.GET_SEARCH_URL(query)
      );
      return searchResponse;
    } catch (error) {
      return error;
    }
  }
};

export default searchService;
