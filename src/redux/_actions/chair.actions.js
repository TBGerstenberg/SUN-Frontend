import { chairConstants } from "../_constants";
import { chairService } from "../../services";

function getAllChairs() {
  return async (dispatch, getState) => {
    const state = getState();
    const accessToken = state.login.accessToken;

    dispatch(request());
    const getAllChairsResponse = await chairService.getAllChairs(accessToken);

    if (getAllChairsResponse) {
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
    return { type: chairConstants.GET_CHAIRS_SUCCESS, chairs: chairs };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: chairConstants.GET_CHAIRS_FAILURE, error };
  }
}

const chairActions = {
  getAllChairs
};

export default chairActions;
