const BASEURL = "http://localhost:5000/api";

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
    GET_ALL_CHAIRS_URL: BASEURL + "/chairs"
  }
};

export default API_CONFIG;
