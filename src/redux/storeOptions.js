import { redirect } from "redux-first-router";
import navigationConstants from "./_constants/navigation.constants";
import { FEATURE_CONFIG } from "../config/feature.config";
// package to build upon a previously exiting browser history
const createHistory = require("history").createBrowserHistory;

const reduxFirstRouterOptions = {
  // Hook that fires before a navigation action is triggered
  onBeforeChange: (dispatch, getState, action) => {
    const state = getState();
    const loginState = state.login;
    const location = state.location;

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

  history: createHistory
};

const isAllowedToVisitRoute = (navigationActionType, loginState, routesMap) => {
  const route = routesMap[navigationActionType];
  if (route && route.requiresAuth) {
    // Route exists and doesnt require authentication
    if (!route.requiresAuth) {
      return true;
    } else {
      // Route requires auth, but user is not logged in
      if (!loginState.loggedIn) {
        console.log("Rejecting because of missing Login on protected route");
        console.log("The user trying to access is ");
        console.log(loginState);
        return false;
      } else {
        if (route.role) {
          // Route requires auth, and user is logged in, but may not have the needed role (user, admin..) to access the route.
          if (loginState.user && loginState.user.roles) {
            console.log("Rejecting because of missing role to access route");
            console.log("The user trying to access is ");
            console.log(loginState);
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
