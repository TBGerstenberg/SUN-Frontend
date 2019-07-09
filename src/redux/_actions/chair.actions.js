import { chairService } from "../../services";
import { chairConstants } from "../_constants";

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
   * Redux action creator triggered when a FETCH-ALL-request for chairs is started
   */
  function request() {
    return { type: chairConstants.GET_CHAIR_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } chairs - Chairs that have been fetched
   */
  function success(chair) {
    return { type: chairConstants.GET_CHAIR_SUCCESS, chair: chair };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: chairConstants.GET_CHAIR_FAILURE, error };
  }
}

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
   * Redux action creator triggered when a FETCH-ALL-request for chairs is started
   */
  function request() {
    return { type: chairConstants.GET_CHAIR_POSTS_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } chairs - Chairs that have been fetched
   */
  function success(posts) {
    return { type: chairConstants.GET_CHAIR_POSTS_SUCCESS, posts: posts };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
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
