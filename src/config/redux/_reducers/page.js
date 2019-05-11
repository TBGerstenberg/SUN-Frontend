// pageReducer.js - maps react components to redux actions
const components = {
  HOME: "Home",
  COMPLETE_PROFILE: "CompleteProfile",
  PROFILE: "Profile",
  SIGNUP: "Signup",
  LOGIN: "Login",
  DATA_PROCESSING_AGREEMENT: "DataProcessingAgreement",
  TERMS_OF_SERVICE: "TermsOfService"
};

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
