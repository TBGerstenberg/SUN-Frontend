import axios from "axios";
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
      const getAllChairsResponse = await axios.get(
        API_CONFIG.CHAIRS.GET_ALL_CHAIRS_URL,
        {
          headers: headers
        }
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  }
};

export default chairService;
