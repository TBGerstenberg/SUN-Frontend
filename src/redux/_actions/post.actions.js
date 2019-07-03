import { postConstants } from "../_constants";
import { postService } from "../../services";

function getAllPosts() {
  return async (dispatch, getState) => {
    const state = getState();
    const accessToken = state.login.accessToken;

    dispatch(request());
    const getAllPostsResponse = await postService.getAllPosts(accessToken);

    if (getAllPostsResponse && getAllPostsResponse.status === 200) {
      dispatch(success(getAllPostsResponse.data));
    } else {
      dispatch(failure(getAllPostsResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.GET_POSTS_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(posts) {
    return { type: postConstants.GET_POSTS_SUCCESS, posts: posts };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.GET_POSTS_FAILURE, error };
  }
}

function getFeedPosts() {
  return async (dispatch, getState) => {
    dispatch(request());
    const getFeedPostsResponse = await postService.getFeedPosts();

    if (getFeedPostsResponse && getFeedPostsResponse.status === 200) {
      dispatch(success(getFeedPostsResponse.data));
    } else {
      dispatch(failure(getFeedPostsResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.GET_FEED_POSTS_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(posts) {
    return { type: postConstants.GET_FEED_POSTS_SUCCESS, posts: posts };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.GET_FEED_POSTS_FAILURE, error };
  }
}

function getSinglePost(postId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const getSinglePostResponse = await postService.getSinglePost(postId);

    if (getSinglePostResponse && getSinglePostResponse.status === 200) {
      dispatch(success(getSinglePostResponse.data));
    } else {
      dispatch(failure(getSinglePostResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.GET_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(post) {
    return { type: postConstants.GET_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.GET_POST_FAILURE, error };
  }
}

function createPost(pageId, postValues) {
  return async (dispatch, getState) => {
    dispatch(request());
    const createPostResponse = await postService.createPost(pageId, postValues);

    if (createPostResponse && createPostResponse.status === 200) {
      dispatch(success(createPostResponse.data));
    } else {
      dispatch(failure(createPostResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.ADD_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(post) {
    return { type: postConstants.ADD_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.ADD_POST_FAILURE, error };
  }
}

function updatePost(postId, postValues) {
  return async (dispatch, getState) => {
    dispatch(request());
    const updatePostResposne = await postService.updatePost(postId, postValues);

    if (updatePostResposne && updatePostResposne.status === 200) {
      dispatch(success(updatePostResposne.data));
    } else {
      dispatch(failure(updatePostResposne));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.EDIT_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(post) {
    return { type: postConstants.EDIT_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.EDIT_POST_FAILURE, error };
  }
}

function removePost(postId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const removePostResponse = await postService.deletePost(postId);

    if (removePostResponse && removePostResponse.status === 200) {
      dispatch(success(removePostResponse.data));
    } else {
      dispatch(failure(removePostResponse));
    }
  };

  /**
   * Redux action creator triggered when a FETCH-ALL-request for posts is started
   */
  function request() {
    return { type: postConstants.REMOVE_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request succeeded
   * @param {Array of objects } posts - Posts that have been fetched
   */
  function success(post) {
    return { type: postConstants.REMOVE_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a FETCH-ALL-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.REMOVE_POST_FAILURE, error };
  }
}

const postActions = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  removePost,
  getFeedPosts
};

export default postActions;
