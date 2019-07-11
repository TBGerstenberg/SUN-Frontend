import { searchConstants } from "../_constants";

/***************************************************************
 * Redux reducer that reacts to search-related redux-actions dispatched
 * by one or more action creatos and changes the application state accordingly.
 * Each reducer represents a first-level node in the application state
 * that is represented as a tree of JS-objects. This reducer manages
 * the first-level node called "search" and all objects nested in
 * lower levels of the state tree below the "search"-node.
 * The below "initialstate" is used to define how the state-tree
 * managed by this reducer looks like when initialized.
 **************************************************************/

const initialState = { serchResults: {} };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchConstants.SEARCH_REQUEST:
      return {
        ...state,
        fetchingSearchResults: true
      };

    case searchConstants.SEARCH_SUCCESS:
      return {
        ...state,
        fetchingSearchResults: false,
        searchResults: action.payload.searchResults
      };

    case searchConstants.SEARCH_FAILURE:
      return {
        ...state,
        fetchingSearchResults: false
      };

    default:
      return state;
  }
};

export default searchReducer;
