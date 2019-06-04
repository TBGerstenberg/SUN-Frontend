const BASEURL = "http://localhost:5000/api";

const API_CONFIG = {
  REGISTRATION: {
    POST_REGISTRATION_URL: BASEURL + "/auth/signup"
  },
  LOGIN: {
    POST_LOGIN_URL: BASEURL + "/auth/login",
    GET_LOGOUT_URL: BASEURL + "/auth/logout"
  },
  USERS: {
    GET_ALL_USERS_URL: BASEURL + "/person",
    UPDATE_PROFILE_URL: BASEURL + "/persons"
  },
  CHAIRS: {
    GET_ALL_CHAIRS_URL: BASEURL + "/chairs"
  }
};

export default API_CONFIG;
