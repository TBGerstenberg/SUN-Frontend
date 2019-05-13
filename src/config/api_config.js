const BASEURL = "http://localhost:5001/api";

const API_CONFIG = {
  REGISTRATION: {
    POST_REGISTRATION_URL: BASEURL + "/signup"
  },
  LOGIN: {
    POST_LOGIN_URL: BASEURL + "/auth/session"
  },
  USERS: {
    UPDATE_PROFILE_URL: BASEURL + "/persons"
  }
};

export default API_CONFIG;
