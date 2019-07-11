import { chairService } from "../../services";
import { chairConstants } from "../_constants";

/** ************************************************************************************
 *  Chair-related action creators that dispatch actions like network requests
 *  to the SUN-API and track their progress within redux, so that various components
 *  in the component tree can react to events regarding these operations.
 ****************************************************************************************/

/**
 * Fetches a list resource of chairs and tracks the progress, success or error within redux.
 */
function getAllChairs() {
  return async (dispatch, getState) => {
    const state = getState();
    const accessToken = state.login.accessToken;

    dispatch(request());
    const getAllChairsResponse = await chairService.getAllChairs(accessToken);

    if (getAllChairsResponse && getAllChairsResponse.status === 200) {
      dispatch(success(getAllChairsResponse.data));
    } else {
      dispatch(failure(getAllChairsResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for chairs is started
   */
  function request() {
    return { type: chairConstants.GET_CHAIRS_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } chairs - Chairs that have been fetched
   */
  function success(chairs) {
    return {
      type: chairConstants.GET_CHAIRS_SUCCESS,
      chairs: chairs
    };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: chairConstants.GET_CHAIRS_FAILURE, error };
  }
}

/**
 * Fetches a single chair identified by its public id  and tracks the progress, success or error within redux.
 * @param {Number} chairId - Unique identifier of the chair that shall be fetched
 */
function getSingleChair(chairId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const getSingleChairResponse = await chairService.getSingleChair(chairId);

    if (getSingleChairResponse && getSingleChairResponse.status === 200) {
      dispatch(success(getSingleChairResponse.data));
    } else {
      dispatch(failure(getSingleChairResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-SINGLE-request for chairs is started
   */
  function request() {
    return { type: chairConstants.GET_CHAIR_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-SINGLE-request succeeded
   * @param {object} chair - Chair that has been fetched
   */
  function success(chair) {
    return { type: chairConstants.GET_CHAIR_SUCCESS, chair: chair };
  }

  /**
   * Redux action creator triggered when a FETCH-SINGLE-request failed
   * @param {*} error - Error object thrown when creating the request
   */
  function failure(error) {
    return { type: chairConstants.GET_CHAIR_FAILURE, error };
  }
}

/**
 * Fetches the posts created by a chair by its public chair-id  and tracks the progress, success or error within redux.
 * @param {Number} chairId - Unique identifier of the chair from which the posts shall be fetched.
 */
function getChairPosts(chairId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const getChairPostsResponse = await chairService.getChairPosts(chairId);

    if (getChairPostsResponse && getChairPostsResponse.status === 200) {
      dispatch(success(getChairPostsResponse.data));
    } else {
      dispatch(failure(getChairPostsResponse));
    }
  };

  /**
   * Redux action creator triggered when the request is created
   */
  function request() {
    return { type: chairConstants.GET_CHAIR_POSTS_REQUEST };
  }

  /**
   * Redux action creator triggered when the request succeeded
   * @param {Array of objects } posts - posts that have been fetched
   */
  function success(posts) {
    return { type: chairConstants.GET_CHAIR_POSTS_SUCCESS, posts: posts };
  }

  /**
   * Redux action creator triggered when the request failes
   * @param {*} error - Error object thrown when creating the fetch-posts request
   */
  function failure(error) {
    return { type: chairConstants.GET_CHAIR_POSTS_FAILURE, error };
  }
}

const chairActions = {
  getAllChairs,
  getSingleChair,
  getChairPosts
};

export default chairActions;
