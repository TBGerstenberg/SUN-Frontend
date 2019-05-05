// pageReducer.js
const components = {
  HOME: "Home",
  PROFILE: "Profile",
  LOGIN: "Login"
};

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
