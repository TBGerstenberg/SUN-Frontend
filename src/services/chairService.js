import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Chairs> API.
 */
class chairService {
  /**
   * Performs a network request to fetch all chairs
   * @param accessToken - NO LONGER USED - showcases how we handled
   * authentication before attaching the accessToken globally - Is left in
   * the codebase to showcase this approach for future reference :)
   */
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

  /**
   * Performs a network request to fetch a single chair from the chair Api
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @returns {object} HTTP-Response Object from the GET_CHAIR Endpoint @or
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network request to fetch the posts of a chair from the chair Api
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @returns {object} HTTP-Response Object from the GET_CHAIR_POSTS Endpoint
   * @or
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network request to create a chair at the chair Api
   * @param {Number} chairBody - a post as in @see /src/models/post
   * @returns {object} HTTP-Response Object from the CREATE_CHAIR Endpoint
   * @or
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network request to update a chair at the chair Api
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @param {Number} updatedChairBody - a post as in @see /src/models/post
   * @returns {object} HTTP-Response Object from the EDIT_CHAIR Endpoint
   * @or
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network request to delete a chair at the chair Api
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @returns {object} HTTP-Response Object from the DELETE_CHAIR Endpoint
   * @or
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network request to create a subscription to a chair
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @returns {object} HTTP-Response Object from the subscription-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   * @note this request is not stateless, it creates the subscription for the currently logged in  user
   */
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

  /**
   * Performs a network request to delete a subscription to a chair
   * @param {Number} chairId - the unique identifier for the chair that shall be fetched
   * @returns {object} HTTP-Response Object from the subscription-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   * @note this request is not stateless, it deletes the subscription for the currently logged in user
   */
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

  /**
   * Performs a network request to create a person-chair relations of a single person towards a single chair
   * @param {Number} chairId - the unique identifier for the chair that shall have a relation created with the user
   * @param {Object} personChairRelation - The personChairRelation object as in /src/models/personChairRelations
   * @returns {object} HTTP-Response Object from the chairRealtion-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   * @note this request is not stateless, it deletes the subscription for the currently logged in user
   */
  static async createPersonChairRelation(chairId, personChairRelation) {
    try {
      const createPersonChairRelationResponse = await apiClient.put(
        API_CONFIG.CHAIRS.CREATE_PERSON_CHAIR_RELATION_URL(chairId),
        personChairRelation
      );
      return createPersonChairRelationResponse;
    } catch (error) {
      return error;
    }
  }

  /**
   * Performs a network request to update a relation a single person has towards a chair.
   * @param {Number} chairId - the unique identifier for the chair that shall have a relation updated with the user
   * @param {Object} personChairRelation - The personChairRelation object as in /src/models/personChairRelations
   * @returns {object} HTTP-Response Object from the chairRealtion-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   * @note this request is not stateless, it does not perform a full update
   * as defined by HTTP-PUT semantics, but rather uses HTTP-PATCH to update some relations without deleting others.
   */
  static updatePersonChairRelation(personChairRelation) {
    return apiClient.patch(
      API_CONFIG.CHAIRS.UPDATE_PERSON_CHAIR_RELATIONS_URL(
        personChairRelation.chairId
      ),
      [personChairRelation]
    );
  }

  /**
   * Performs a set of network requests that update the personChairRelations for multiple chairs at once.
   * Used in the usermanagement section, when we need to update the relations of a single user
   * towards many different chairs, each of which has its own personChairRelation Endpoint.
   * @param {Object} personChairRelations - Array of personChairRelation Objects as in @see /models/personChairRelaiton.js
   * @returns {object} HTTP-Response Object from the chairRelation-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   */
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

  /**
   * Performs a network to update all relations a chair may have towards persons at once.
   * @param {Number} chairId - the unique identifier for the chair that shall have a relation updated with the user
   * @param {Object} personChairRelation - The personChairRelation object as in /src/models/personChairRelations
   * @returns {object} HTTP-Response Object from the chairRealtion-Endpoint
   * @returns {error} Axios Error Object thrown by the request when it fails.
   * @note this request is not stateless, it does not perform a full update
   * as defined by HTTP-PUT semantics, thus overrides the previiously existing
   * relations.
   */
  static async updateAllPersonChairRelationsForChair(
    chairId,
    personChairRelations
  ) {
    try {
      const createPersonChairRelationResponse = await apiClient.put(
        API_CONFIG.CHAIRS.UPDATE_PERSON_CHAIR_RELATIONS_URL(chairId),
        personChairRelations
      );
      return createPersonChairRelationResponse;
    } catch (error) {
      return error;
    }
  }
}

export default chairService;
