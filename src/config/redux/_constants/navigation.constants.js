/**
 * Action-types for the navigation related redux actions.
 */
const navigationConstants = {
  NAVIGATE_TO_LOGIN: "NAVIGATE_TO_LOGIN",
  NAVIGATE_TO_SIGNUP: "NAVIGATE_TO_SIGNUP",
  NAVIGATE_TO_HOME: "NAVIGATE_TO_HOME",
  NAVIGATE_TO_COMPLETE_PROFILE: "NAVIGATE_TO_COMPLETE_PROFILE",
  NAVIGATE_TO_PROFILE: " NAVIGATE_TO_PROFILE",
  NAVIGATE_TO_DATA_PROCESSING_AGREEMENT:
    "NAVIGATE_TO_DATA_PROCESSING_AGREEMENT",
  NAVIGATE_TO_TERMS_OF_SERVICE: "NAVIGATE_TO_TERMS_OF_SERVICE"
};

/**
 * Maps Redux-actions to uri's that can be navigated to using the browsers adress-bar
 */
export const routesMap = {
  NAVIGATE_TO_LOGIN: "/",
  NAVIGATE_TO_SIGNUP: "/signup",
  NAVIGATE_TO_HOME: "/home",
  NAVIGATE_TO_COMPLETE_PROFILE: "/complete-profile",
  NAVIGATE_TO_PROFILE: "/profile",
  NAVIGATE_TO_DATA_PROCESSING_AGREEMENT: "/DataProcessingAgreement",
  NAVIGATE_TO_TERMS_OF_SERVICE: "/TermsOfService"
};

/**
 * Maps Redux-actions to components that shall be rendered when an action is dispatched.
 * Is used in
 */
export const componentsMap = {
  NAVIGATE_TO_LOGIN: "Login",
  NAVIGATE_TO_SIGNUP: "Signup",
  NAVIGATE_TO_HOME: "Home",
  NAVIGATE_TO_COMPLETE_PROFILE: "CompleteProfile",
  NAVIGATE_TO_PROFILE: "Profile",
  NAVIGATE_TO_DATA_PROCESSING_AGREEMENT: "DataProcessingAgreement",
  NAVIGATE_TO_TERMS_OF_SERVICE: "TermsOfService"
};

export default navigationConstants;
