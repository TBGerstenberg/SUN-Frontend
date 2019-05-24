import { NOT_FOUND } from "redux-first-router";

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
  NAVIGATE_TO_LANDING_PAGE: "NAVIGATE_TO_LANDING_PAGE"
};

/**
 * Maps Redux-actions to uri's that can be navigated to using the browsers adress-bar
 */
export const routesMap = {
  NAVIGATE_TO_LOGIN: { path: "/", requiresAuth: false },
  NAVIGATE_TO_SIGNUP: { path: "/signup", requiresAuth: false },
  NAVIGATE_TO_HOME: { path: "/home", requiresAuth: true, role: "user" },
  NAVIGATE_TO_COMPLETE_PROFILE: {
    path: "/complete-profile",
    requiresAuth: true,
    role: "user"
  },
  NAVIGATE_TO_PROFILE: { path: "/profile", requiresAuth: true, role: "user" },
  NAVIGATE_TO_DATA_PROCESSING_AGREEMENT: {
    path: "/DataProcessingAgreement",
    requiresAuth: false,
    role: ""
  },
  NAVIGATE_TO_TERMS_OF_SERVICE: {
    path: "/TermsOfService",
    requiresAuth: false,
    role: ""
  },
  NAVIGATE_TO_LANDING_PAGE: {
    path: "/start",
    requiresAuth: false,
    role: ""
  }
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
  [NOT_FOUND]: "NotFound"
};

export default navigationConstants;
