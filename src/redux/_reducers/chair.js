import { chairConstants, postConstants } from "../_constants";

const initialState = {};

const chairReducer = (state = initialState, action) => {
  switch (action.type) {
    case chairConstants.GET_CHAIR_REQUEST:
      return {
        ...state,
        fetchingChairs: true
      };
    case chairConstants.GET_CHAIR_SUCCESS:
      return {
        ...state,
        fetchingChairs: false,
        currentlyViewedChair: action.chair
      };
    case chairConstants.GET_CHAIR_FAILURE:
      return {
        ...state,
        error: action.error,
        fetchChairStatus: action.error.response.status
      };

    case chairConstants.GET_CHAIRS_REQUEST:
      return {
        ...state,
        fetchingChairs: true
      };
    case chairConstants.GET_CHAIRS_SUCCESS:
      return {
        ...state,
        fetchingChairs: false,
        chairs: action.chairs
      };
    case chairConstants.GET_CHAIRS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case chairConstants.GET_CHAIR_POSTS_REQUEST:
      return {
        ...state
      };
    case chairConstants.GET_CHAIR_POSTS_SUCCESS:
      return {
        ...state,
        chairPosts: action.posts
      };
    case chairConstants.GET_CHAIR_POSTS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case postConstants.REMOVE_POST_REQUEST:
      return { ...state };

    case postConstants.REMOVE_POST_SUCCESS:
      let mutatedChairPosts = [...state.chairPosts];
      const indexOfDeletedChair = mutatedChairPosts.findIndex(post => {
        return (post.id = action.removedPostId);
      });
      mutatedChairPosts.splice(indexOfDeletedChair, 1);

      return {
        ...state,
        chairPosts: mutatedChairPosts
      };

    case postConstants.REMOVE_POST_FAILURE:
      return {
        deletePostFailureStatus: action.error.status
      };

    default:
      return state;
  }
};

export default chairReducer;
