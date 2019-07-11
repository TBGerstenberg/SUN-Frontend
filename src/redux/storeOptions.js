import { redirect } from "redux-first-router";
import { FEATURE_CONFIG } from "../config/feature.config";
import navigationConstants from "./_constants/navigation.constants";

// package to build upon a previously exiting browser history
const createHistory = require("history").createBrowserHistory;

/**
 * Configures the options-object that can be used to configure
 * the behaviour of redux-first-router, the routing solution
 * deployed in this project.
 */
const reduxFirstRouterOptions = {
  // Hook that fires before a navigation action is triggered
  onBeforeChange: (dispatch, getState, action) => {
    const state = getState();
    const loginState = state.login;
    const location = state.location;

    // If enabled, routes that are configures as being protected
    // in navigation.constants.js will trigger a redirect when
    // visited unauthenticated or when the user does not have
    // one of the required roles to access the route.
    if (
      FEATURE_CONFIG.authentication
        .redirectToLoginWhenAccessingProtectedRoutesUnauthenticated
    ) {
      const allowed = isAllowedToVisitRoute(
        action.action.type,
        loginState,
        location.routesMap
      );
      if (!allowed) {
        const action = redirect({
          type: navigationConstants.NAVIGATE_TO_LOGIN
        });
        dispatch(action);
      }
    }
  },

  // Hook that fires after a navigation action has been triggered
  onAfterChange: (dispatch, getState) => {
    const { type } = getState().location;

    if (type === "LOGIN") {
      //setTimeout(() => alert(), 1500);
    }
  },

  // Sets redux-first router to connect to existing browsing-history
  // when the router is initialized. So "back"-navigation in the browser works.
  history: createHistory,

  extra: {}
};

/**
 * Utility that computes wether or not a user
 * is allowed to visit a route based on his auth-data stored in
 * the login-Node of the redux state.
 */
const isAllowedToVisitRoute = (navigationActionType, loginState, routesMap) => {
  const route = routesMap[navigationActionType];
  if (route && route.requiresAuth) {
    // Route exists and doesnt require authentication
    if (!route.requiresAuth) {
      return true;
    } else {
      // Route requires auth, but user is not logged in
      if (!loginState.loggedIn) {
        return false;
      } else {
        if (route.role) {
          // Route requires auth, and user is logged in, but may not have the needed role (user, admin..) to access the route.
          if (loginState.user && loginState.user.roles) {
            return loginState.user.roles.includes(route.role);
          }
        } else {
          return true;
        }
      }
    }
  } else {
    return true;
  }
};

export default reduxFirstRouterOptions;
