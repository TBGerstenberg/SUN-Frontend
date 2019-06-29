import { NOT_FOUND } from "redux-first-router";

/**
 * Action-types for the navigation related redux actions.
 */
const navigationConstants = {
  NAVIGATE_TO_LOGIN: "NAVIGATE_TO_LOGIN",
  NAVIGATE_TO_SIGNUP: "NAVIGATE_TO_SIGNUP",
  NAVIGATE_TO_HOME: "NAVIGATE_TO_HOME",
  NAVIGATE_TO_COMPLETE_PROFILE: "NAVIGATE_TO_COMPLETE_PROFILE",
  NAVIGATE_TO_PROFILE: "NAVIGATE_TO_PROFILE",
  NAVIGATE_TO_DATA_PROCESSING_AGREEMENT:
    "NAVIGATE_TO_DATA_PROCESSING_AGREEMENT",
  NAVIGATE_TO_TERMS_OF_SERVICE: "NAVIGATE_TO_TERMS_OF_SERVICE",
  NAVIGATE_TO_LANDING_PAGE: "NAVIGATE_TO_LANDING_PAGE",
  NAVIGATE_TO_ADMIN_PANEL: "NAVIGATE_TO_ADMIN_PANEL",
  NAVIGATE_TO_JOB_PAGE: "NAVIGATE_TO_JOB_PAGE",
  NAVIGATE_TO_CHAIR_PAGE: "NAVIGATE_TO_CHAIR_PAGE",
  NAVIGATE_TO_ALLCHAIRS_PAGE: "NAVIGATE_TO_ALLCHAIRS_PAGE",
  NAVIGATE_TO_SEARCH_PAGE: "NAVIGATE_TO_SEARCH_PAGE"

};

/**
 * Maps Redux-actions to uri's that can be navigated to using the browsers adress-bar
 */
export const routesMap = {
  NAVIGATE_TO_LOGIN: { path: "/", requiresAuth: false },
  NAVIGATE_TO_SIGNUP: { path: "/signup", requiresAuth: false },
  NAVIGATE_TO_HOME: { path: "/home", requiresAuth: true },
  NAVIGATE_TO_COMPLETE_PROFILE: {
    path: "/complete-profile",
    requiresAuth: true
  },
  NAVIGATE_TO_PROFILE: {
    path: "/profile/:userId",
    thunk: (dispatch, getState, extra) => {},
    requiresAuth: true
  },
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
  },
  NAVIGATE_TO_ADMIN_PANEL: {
    path: "/admin",
    requiresAuth: true,
    role: "ADMIN"
  },
  NAVIGATE_TO_JOB_PAGE: {
    path: "/job",
    requiresAuth: true,
    role: ""
  },
  NAVIGATE_TO_CHAIR_PAGE: {
    path: "/chair/:chairId",
    requiresAuth: true,
    role: ""
  },
  NAVIGATE_TO_ALLCHAIRS_PAGE: {
    path: "/allchairs",
    requiresAuth: true,
    role: ""
  },
  NAVIGATE_TO_SEARCH_PAGE: {
    path: "/search",
    requiresAuth: true,
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
  NAVIGATE_TO_ADMIN_PANEL: "AdminPanel",
  NAVIGATE_TO_JOB_PAGE: "Job",
  NAVIGATE_TO_CHAIR_PAGE: "ChairPage",
  NAVIGATE_TO_ALLCHAIRS_PAGE: "AllChairs",
  NAVIGATE_TO_SEARCH_PAGE: "Search",

  [NOT_FOUND]: "NotFound"
};

export default navigationConstants;
