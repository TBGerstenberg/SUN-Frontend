import { redirect as reduxFirstRouterRedirect } from "redux-first-router";

function redirect(actionType, actionPayload) {
  return dispatch => {
    const navigationRedirect = reduxFirstRouterRedirect({
      type: actionType,
      payload: actionPayload
    });

    dispatch(navigationRedirect);
  };
}

export default {
  redirect: redirect
};
