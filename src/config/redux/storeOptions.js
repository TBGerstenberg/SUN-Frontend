import { redirect } from "redux-first-router";
import navigationConstants from "./_constants/navigation.constants";
// package to build upon a previously exiting browser history
const createHistory = require("history").createBrowserHistory;

const reduxFirstRouterOptions = {
  // Hook that fires before a navigation action is triggered
  onBeforeChange: (dispatch, getState, action) => {
    const state = getState();
    const loginState = state.login;
    const location = state.location;
    const allowed = isAllowedToVisitRoute(
      action.action.type,
      loginState,
      location.routesMap
    );

    if (!allowed) {
      const action = redirect({ type: navigationConstants.NAVIGATE_TO_LOGIN });
      dispatch(action);
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
    if (route.requiresAuth === false) {
      return true;
    } else {
      // Route requires auth, but user is not logged in
      if (!loginState.loggedIn) {
        return false;
      }
      // Route requires auth, and user is logged in, but may not have the needed role (user, admin..) to access the route.
      const roleRequiredByRoute = route.role;
      const user = loginState.user;
      return user.roles.includes(roleRequiredByRoute);
    }
  } else {
    return true;
  }
};

export default reduxFirstRouterOptions;
