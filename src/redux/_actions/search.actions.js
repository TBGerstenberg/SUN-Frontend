import searchService from "../../services/searchService";
import { searchConstants } from "../_constants";

/** ************************************************************************************
 *  Search-related action creators that dispatch actions like network requests
 *  to the SUN-API and track their progress within redux, so that various components
 *  in the component tree can react to events regarding these operations.
 ****************************************************************************************/

/**
 * Performs a search-operation at the search API and tracks progress, success or failure within redux
 * @param {String} query - the keysword that the search shall be performed for
 */
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
   * Redux action creator triggered when a search is started
   */
  function request() {
    return { type: searchConstants.SEARCH_REQUEST };
  }

  /**
   * Redux action creator triggered when a search succeeded
   * @param {Array of objects } searchResults - @See backend Postman Collection for details.
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
   * Redux action creator triggered when a search failed
   * @param {*} error - Error object thrown when creating the request
   */
  function failure(error) {
    return { type: searchConstants.SEARCH_FAILURE, error };
  }
}

const searchActions = {
  search
};

export default searchActions;
