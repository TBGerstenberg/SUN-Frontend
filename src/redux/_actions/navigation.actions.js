import navigationConstants from "../_constants/navigation.constants";
import { redirect as reduxFirstRouterRedirect } from "redux-first-router";

function redirect(actionType) {
  return dispatch => {
    console.log(navigationConstants);
    console.log(actionType);

    const navigationRedirect = reduxFirstRouterRedirect({
      type: actionType
    });

    dispatch(navigationRedirect);
  };
}

export default {
  redirect: redirect
};
