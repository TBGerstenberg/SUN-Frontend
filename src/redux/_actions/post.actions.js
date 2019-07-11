import { chairActions } from ".";
import { postService } from "../../services";
import { postConstants } from "../_constants";

/** ************************************************************************************
 *  Post-related action creators that dispatch actions like network requests
 *  to the SUN-API and track their progress within redux, so that various components
 *  in the component tree can react to events regarding these operations.
 ****************************************************************************************/

/**
 * Fetches a list resource of posts and tracks progress, success or failure within redux
 */
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

/**
 * Fetches posts from the users feed
 * NOTE: The user is identified by his session token which is attached in the gloabl
 * apiClient config @see config/api/apiClient
 */
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

/**
 * Fetches a single post identified by its unique postId and tracks progress, success or failure within redux
 */
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
   * Redux action creator triggered when a FETCH-SINGLE-request for posts is started
   */
  function request() {
    return { type: postConstants.GET_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a FETCH-SINGLE-request succeeded
   * @param {object } post - Posts that have been fetched
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

/**
 * Creates a post that is associated with a page (chair, group, ...)
 * @param {Number} pageId - Identifier of the page that this post was created in
 * @param {Object} postValues - values as in @see /src/models/post.js
 */
function createPost(pageId, postValues) {
  return async (dispatch, getState) => {
    dispatch(request());
    const createPostResponse = await postService.createPost(pageId, postValues);

    if (createPostResponse && createPostResponse.status === 200) {
      dispatch(chairActions.getChairPosts(pageId));

      dispatch(success(createPostResponse.data));
    } else {
      dispatch(failure(createPostResponse));
    }
  };

  /**
   * Redux action creator triggered when a CREATE-request for posts is started
   */
  function request() {
    return { type: postConstants.ADD_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a CREATE-request succeeded
   * @param {object } post - Post that was created
   */
  function success(post) {
    return { type: postConstants.ADD_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a CREATE-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.ADD_POST_FAILURE, error };
  }
}

/**
 * Updates an existing post identified by its postId and tracks progress, success or failure within redux
 * @param {Number} postId - unique id of the post that shall be edited
 * @param {Object} postValues - post object as in @see models/post
 */
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
   * Redux action creator triggered when an EDIT-request for a post is started
   */
  function request() {
    return { type: postConstants.EDIT_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when an EDIT-request succeeded
   * @param {object } post - Post that was created
   */
  function success(post) {
    return { type: postConstants.EDIT_POST_SUCCESS, post: post };
  }

  /**
   * Redux action creator triggered when a  EDIT-POST-request failed
   * @param {*} error - Error object thrown when creating the registration request
   */
  function failure(error) {
    return { type: postConstants.EDIT_POST_FAILURE, error };
  }
}

/**
 * Deletes an existing post identified by its postId and tracks progress, success or failure within redux
 * @param {Number} postId - unique id of the post that shall be edited
 */
function deletePost(postId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const removePostResponse = await postService.deletePost(postId);

    if (removePostResponse && removePostResponse.status === 200) {
      dispatch(success(postId));
    } else {
      dispatch(failure(removePostResponse));
    }
  };

  /**
   * Redux action creator triggered when a DELETE-request for  a post is started
   */
  function request() {
    return { type: postConstants.REMOVE_POST_REQUEST };
  }

  /**
   * Redux action creator triggered when a DELETE-POST-request succeeded
   * @param {Number} postId - Id of the Post that has been removed
   */
  function success(postId) {
    return { type: postConstants.REMOVE_POST_SUCCESS, removedPostId: postId };
  }

  /**
   * Redux action creator triggered when a DELETE-POST-request failed
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
  deletePost,
  getFeedPosts
};

export default postActions;
