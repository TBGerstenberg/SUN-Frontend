import axios from "axios";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Account> and <Person> API.
 */
const chairService = {
  getAllChairs: async () => {
    try {
      const getAllChairsResponse = await axios.get(
        API_CONFIG.CHAIRS.GET_ALL_CHAIRS_URL
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  }
};

export default chairService;
