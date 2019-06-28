import apiClient from "../api/apiClient";
import API_CONFIG from "../config/api_config";

/**
 * Service that handles interaction with the <Posts> API.
 */
const postService = {
  getAllPosts: async accessToken => {
    const headers = {
      Authorization: accessToken
    };

    try {
      const getAllPostsResponse = await apiClient.get(
        API_CONFIG.POSTS.GET_ALL_POSTS_URL,
        {
          headers: headers
        }
      );
      return getAllPostsResponse;
    } catch (error) {
      return error;
    }
  },

  getSinglePost: async postId => {
    try {
      const getAllPostsResponse = await apiClient.get(
        API_CONFIG.POSTS.GET_SINGLE_POST_URL(postId)
      );
      return getAllPostsResponse;
    } catch (error) {
      return error;
    }
  },

  createPost: async (pageId, postBody) => {
    try {
      const createPostResponse = await apiClient.post(
        API_CONFIG.POSTS.CREATE_POST_URL(pageId),
        postBody
      );
      return createPostResponse;
    } catch (error) {
      return error;
    }
  },

  updatePost: async (postId, updatedPostBody) => {
    try {
      const editPostResponse = await apiClient.put(
        API_CONFIG.POSTS.EDIT_POST_URL(postId),
        updatedPostBody
      );
      return editPostResponse;
    } catch (error) {
      return error;
    }
  },

  deletePost: async postId => {
    try {
      const deletePostResponse = await apiClient.delete(
        API_CONFIG.POSTS.DELETE_POST_URL(postId)
      );
      return deletePostResponse;
    } catch (error) {
      return error;
    }
  }
};

export default postService;
