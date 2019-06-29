import { searchConstants } from "../_constants";

const initialState = { serachResults: {} };

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
