import { searchConstants } from "../_constants";
import searchService from "../../services/searchService";

function search(query) {
  return async dispatch => {
    dispatch(request());
    const searchResponse = await searchService.search(query);

    if (searchResponse && searchResponse.status === 200) {
      dispatch(success(searchResponse.data));
    } else {
      dispatch(failure(searchResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for chairs is started
   */
  function request() {
    return { type: searchConstants.SEARCH_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } chairs - Chairs that have been fetched
   */
  function success(searchResults) {
    return {
      type: searchConstants.SEARCH_SUCCESS,
      payload: {
        searchResults: searchResults
      }
    };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: searchConstants.SEARCH_FAILURE, error };
  }
}

const searchActions = {
  search
};

export default searchActions;
