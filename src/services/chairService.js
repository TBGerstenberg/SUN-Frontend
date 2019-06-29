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
  },

  getChairPosts: async chairId => {
    try {
      const getAllChairsResponse = await apiClient.get(
        API_CONFIG.CHAIRS.GET_CHAIR_POSTS_URL(chairId)
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  },

  createChair: async chairBody => {
    try {
      const createChairResponse = await apiClient.post(
        API_CONFIG.CHAIRS.CREATE_CHAIR_URL(),
        chairBody
      );
      return createChairResponse;
    } catch (error) {
      return error;
    }
  },

  updateChair: async (chairId, updatedChairBody) => {
    try {
      const editChairResponse = await apiClient.put(
        API_CONFIG.CHAIRS.EDIT_CHAIR_URL(chairId),
        updatedChairBody
      );
      return editChairResponse;
    } catch (error) {
      return error;
    }
  },

  deleteChair: async chairId => {
    try {
      const deleteChairResponse = await apiClient.delete(
        API_CONFIG.CHAIRS.DELETE_CHAIR_URL(chairId)
      );
      return deleteChairResponse;
    } catch (error) {
      return error;
    }
  },

  subscribeToChair: async chairId => {
    try {
      const subscribeToChairRequestBody = {};

      const subscribeToChairResponse = await apiClient.put(
        API_CONFIG.CHAIRS.SUBSCRIBE_TO_CHAIR_URL(chairId),
        subscribeToChairRequestBody
      );
      return subscribeToChairResponse;
    } catch (error) {
      return error;
    }
  },

  unsubscribeFromChair: async chairId => {
    try {
      const subscribeToChairRequestBody = {};

      const subscribeToChairResponse = await apiClient.delete(
        API_CONFIG.CHAIRS.UNSUBSCRIBE_FROM_CHAIR_URL(chairId),
        subscribeToChairRequestBody
      );
      return subscribeToChairResponse;
    } catch (error) {
      return error;
    }
  },

  createPersonChairRelation: async (
    chairId,
    personChairRelationRequestBody
  ) => {
    try {
      const createPersonChairRelationRequestBody = {};

      const createPersonChairRelationResposne = await apiClient.put(
        API_CONFIG.CHAIRS.CREATE_PERSON_CHAIR_RELATION_URL(chairId),
        personChairRelationRequestBody
      );
      return createPersonChairRelationResposne;
    } catch (error) {
      return error;
    }
  }
};

export default chairService;
