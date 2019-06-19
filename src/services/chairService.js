import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Chairs> API.
 */
const chairService = {
  getAllChairs: async accessToken => {
    const headers = {
      Authorization: accessToken
    };

    try {
      const getAllChairsResponse = await apiClient.get(
        API_CONFIG.CHAIRS.GET_ALL_CHAIRS_URL,
        {
          headers: headers
        }
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  },

  getSingleChair: async chairId => {
    

    try {
      const getAllChairsResponse = await apiClient.get(
        API_CONFIG.CHAIRS.GET_SINGLE_CHAIR_URL(chairId)
        
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  }
};

export default chairService;
