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

  deleteChair: async chairId => {
    try {
      const deleteChairResponse = await apiClient.delete(
        API_CONFIG.CHAIRS.DELETE_CHAIR_URL()
      );
      return deleteChairResponse;
    } catch (error) {
      return error;
    }
  }
};

export default chairService;
