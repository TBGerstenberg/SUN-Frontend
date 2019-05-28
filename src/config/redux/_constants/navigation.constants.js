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
  NAVIGATE_TO_TERMS_OF_SERVICE: "NAVIGATE_TO_TERMS_OF_SERVICE",
  NAVIGATE_TO_LANDING_PAGE: "NAVIGATE_TO_LANDING_PAGE",
  NAVIGATE_TO_JOB:"NAVIGATE_TO_JOB",
  NAVIGATE_TO_CHAIR_PAGE:"NAVIGATE_TO_CHAIR_PAGE"
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
  NAVIGATE_TO_TERMS_OF_SERVICE: "/TermsOfService",
  NAVIGATE_TO_LANDING_PAGE: "/start",
  NAVIGATE_TO_JOB:"/job",
  NAVIGATE_TO_CHAIR_PAGE:"/chairpage"
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
  NAVIGATE_TO_TERMS_OF_SERVICE: "TermsOfService",
  NAVIGATE_TO_LANDING_PAGE: "LandingPage",
  NAVIGATE_TO_JOB: "Job",
  NAVIGATE_TO_CHAIR_PAGE: "ChairPage"
};

export default navigationConstants;
