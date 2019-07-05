import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Search> API.
 */
const searchService = {
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
