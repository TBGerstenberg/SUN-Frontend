import { postConstants } from "../_constants";

/***************************************************************
 * Redux reducer that reacts to post-related redux-actions dispatched
 * by one or more action creatos and changes the application state accordingly.
 * Each reducer represents a first-level node in the application state
 * that is represented as a tree of JS-objects. This reducer manages
 * the first-level node called "post" and all objects nested in
 * lower levels of the state tree below the "post"-node.
 **************************************************************/

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postConstants.GET_FEED_POSTS_REQUEST:
      return {
        ...state,
        fetchingPosts: true
      };
    case postConstants.GET_FEED_POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        feedPosts: action.posts
      };
    case postConstants.GET_FEED_POSTS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case postConstants.GET_POST_REQUEST:
      return {
        ...state,
        fetchingPosts: true
      };
    case postConstants.GET_POST_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        currentlyViewedPost: action.post
      };
    case postConstants.GET_POST_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case postConstants.GET_POSTS_REQUEST:
      return {
        ...state,
        fetchingPosts: true
      };
    case postConstants.GET_POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        posts: action.posts
      };
    case postConstants.GET_POSTS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case postConstants.ADD_POST_REQUEST: {
      return {
        ...state
      };
    }
    case postConstants.ADD_POST_SUCCESS: {
      return {
        ...state,
        posts: [].concat(state, [action.post])
      };
    }
    case postConstants.ADD_POST_FAILURE: {
      return { ...state, error: action.error };
    }

    case postConstants.EDIT_POST_REQUEST: {
      return {
        ...state
      };
    }
    case postConstants.EDIT_POST_SUCCESS: {
      return {
        ...state
        // TODO: find and replace edited post
      };
    }
    case postConstants.EDIT_POST_FAILURE: {
      return { ...state, error: action.error };
    }

    case postConstants.REMOVE_POST_FAILURE: {
      return { ...state, error: action.error };
    }

    case postConstants.REMOVE_POST_REQUEST: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};

export default postReducer;
