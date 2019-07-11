import {
  NOT_FOUND,
  redirect as reduxFirstRouterRedirect
} from "redux-first-router";

/** ************************************************************************************
 *  Navigation-related action creators that dispatch browser navigation as redux actions
 * ,so that various components in the component tree can react to events regarding these operations.
 ****************************************************************************************/

/**
 * Utility to implement redirect functionality that integrated with
 * redux, so that location changes are tracked within it.
 * @param actionType - redux-action Type as defined in @see navigationConstants
 * @param actionpayload - A payload that can be utilized by redux-reducers listening for redirect-events.
 */
function redirect(actionType, actionPayload) {
  return dispatch => {
    const navigationRedirect = reduxFirstRouterRedirect({
      type: actionType,
      payload: actionPayload
    });

    dispatch(navigationRedirect);
  };
}

/**
 * Utility to redirect to the NOT-FOUND component, which is special since
 * its managed by redux-first-router and dispatched whenever a site shall be visited that
 * doesnt exist. We wrap this functionality and call it explicitly to allow to display
 * the same NOT_FOUND page whenever a HTTP-status 404 returned from serivce calls
 */
function redirectToNotFound() {
  return dispatch => {
    return dispatch(redirect(NOT_FOUND));
  };
}

export default {
  redirect: redirect,
  redirectToNotFound: redirectToNotFound
};
