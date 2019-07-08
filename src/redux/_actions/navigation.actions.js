import {
  NOT_FOUND,
  redirect as reduxFirstRouterRedirect
} from "redux-first-router";

function redirect(actionType, actionPayload) {
  return dispatch => {
    const navigationRedirect = reduxFirstRouterRedirect({
      type: actionType,
      payload: actionPayload
    });

    dispatch(navigationRedirect);
  };
}

function redirectToNotFound() {
  return dispatch => {
    return dispatch(redirect(NOT_FOUND));
  };
}

export default {
  redirect: redirect,
  redirectToNotFound: redirectToNotFound
};
