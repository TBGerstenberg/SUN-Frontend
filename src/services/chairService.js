import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Chairs> API.
 */
class chairService {
  static async getAllChairs(accessToken) {
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
  }

  static async getSingleChair(chairId) {
    try {
      const getAllChairsResponse = await apiClient.get(
        API_CONFIG.CHAIRS.GET_SINGLE_CHAIR_URL(chairId)
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  }

  static async getChairPosts(chairId) {
    try {
      const getAllChairsResponse = await apiClient.get(
        API_CONFIG.CHAIRS.GET_CHAIR_POSTS_URL(chairId)
      );
      return getAllChairsResponse;
    } catch (error) {
      return error;
    }
  }

  static async createChair(chairBody) {
    try {
      const createChairResponse = await apiClient.post(
        API_CONFIG.CHAIRS.CREATE_CHAIR_URL(),
        chairBody
      );
      return createChairResponse;
    } catch (error) {
      return error;
    }
  }

  static async updateChair(chairId, updatedChairBody) {
    try {
      const editChairResponse = await apiClient.put(
        API_CONFIG.CHAIRS.EDIT_CHAIR_URL(chairId),
        updatedChairBody
      );
      return editChairResponse;
    } catch (error) {
      return error;
    }
  }

  static async deleteChair(chairId) {
    try {
      const deleteChairResponse = await apiClient.delete(
        API_CONFIG.CHAIRS.DELETE_CHAIR_URL(chairId)
      );
      return deleteChairResponse;
    } catch (error) {
      return error;
    }
  }

  static async subscribeToChair(chairId) {
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
  }

  static async unsubscribeFromChair(chairId) {
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
  }

  static async createPersonChairRelation(chairId, personChairRelation) {
    try {
      const createPersonChairRelationRequestBody = {};

      const createPersonChairRelationResponse = await apiClient.put(
        API_CONFIG.CHAIRS.CREATE_PERSON_CHAIR_RELATION_URL(chairId),
        personChairRelation
      );
      return createPersonChairRelationResponse;
    } catch (error) {
      return error;
    }
  }

  static updatePersonChairRelation(personChairRelation) {
    return apiClient.put(
      API_CONFIG.CHAIRS.UPDATE_PERSON_CHAIR_RELATION_URL(
        personChairRelation.chairId
      ),
      [personChairRelation]
    );
  }

  static async updatePersonChairRelations(personChairRelations) {
    const personChairRelationRequests = [];

    personChairRelations.forEach(personChairRelation => {
      const updatePersonChairRequestPromise = chairService.updatePersonChairRelation(
        personChairRelation
      );
      personChairRelationRequests.push(updatePersonChairRequestPromise);
    });

    const response = await apiClient.all(personChairRelationRequests);

    return response;
  }
}

export default chairService;
