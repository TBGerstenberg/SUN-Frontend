// pageReducer.js - maps react components to redux actions
const components = {
  HOME: "Home",
  COMPLETE_PROFILE: "CompleteProfile",
  PROFILE: "Profile",
  SIGNUP: "Signup",
  LOGIN: "Login"
};

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
