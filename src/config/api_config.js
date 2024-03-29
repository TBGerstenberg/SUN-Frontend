const BASEURL = "http://localhost:5000/api";

/**
 * Central configuration for the backend-endpoints utilized by the various
 * service classes in the system.
 */
const API_CONFIG = {
  BASEURL: "http://localhost:5000/api",
  ACCOUNT: {
    GET_ALL_ACCOUNTS_URL: BASEURL + "/account",

    EDIT_ACCCOUNT_URL: BASEURL + "/account/", // : accountId

    DELETE_ACCOUNT_URL: accountId => {
      return BASEURL + "/account/" + accountId; // : accountId
    }
  },

  REGISTRATION: {
    POST_REGISTRATION_URL: BASEURL + "/auth/signup"
  },

  LOGIN: {
    POST_LOGIN_URL: BASEURL + "/auth/login",
    GET_SESSION_URL: BASEURL + "/auth/session",
    GET_LOGOUT_URL: BASEURL + "/auth/logout"
  },

  USERS: {
    GET_ALL_USERS_URL: BASEURL + "/person",
    GET_SINGLE_USER_URL: userId => {
      return BASEURL + "/person/" + userId;
    },
    UPDATE_PROFILE_URL: BASEURL + "/person/" // :userId
  },
  CHAIRS: {
    GET_ALL_CHAIRS_URL: BASEURL + "/chairs",

    GET_SINGLE_CHAIR_URL: chairId => {
      return BASEURL + "/chairs/" + chairId;
    },

    GET_CHAIR_POSTS_URL: chairId => {
      return BASEURL + "/chairs/" + chairId + "/posts";
    },

    CREATE_CHAIR_URL: () => {
      return BASEURL + "/chairs";
    },
    EDIT_CHAIR_URL: chairId => {
      return BASEURL + "/chairs/" + chairId;
    },
    DELETE_CHAIR_URL: chairId => {
      return BASEURL + "/chairs/" + chairId;
    },
    SUBSCRIBE_TO_CHAIR_URL: chairId => {
      return BASEURL + "/chairs/" + chairId + "/subscription";
    },
    UNSUBSCRIBE_FROM_CHAIR_URL: chairId => {
      return BASEURL + "/chairs/" + chairId + "/subscription";
    },
    CREATE_PERSON_CHAIR_RELATION_URL: chairId => {
      return BASEURL + "/chairs/" + chairId + "/my-relation";
    },
    UPDATE_PERSON_CHAIR_RELATIONS_URL: chairId => {
      return BASEURL + "/chairs/" + chairId + "/admin/person-relations";
    }
  },

  POSTS: {
    GET_ALL_POSTS_URL: BASEURL + "/posts",

    GET_SINGLE_POST_URL: postId => {
      return BASEURL + "/posts/" + postId;
    },

    CREATE_POST_URL: pageId => {
      return BASEURL + "/chairs/" + pageId + "/posts";
    },
    EDIT_POST_URL: postId => {
      return BASEURL + "/posts/" + postId;
    },
    DELETE_POST_URL: postId => {
      return BASEURL + "/post/" + postId;
    },
    GET_FEED_POSTS_URL: () => {
      return BASEURL + "/feed";
    }
  },

  SEARCH: {
    GET_SEARCH_URL: query => {
      return query ? BASEURL + "/search?query=" + query : BASEURL + "/search";
    }
  }
};

export default API_CONFIG;
