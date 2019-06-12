import { redirect as reduxFirstRouterRedirect } from "redux-first-router";

function redirect(actionType) {
  return dispatch => {
    const navigationRedirect = reduxFirstRouterRedirect({
      type: actionType
    });

    dispatch(navigationRedirect);
  };
}

export default {
  redirect: redirect
};
