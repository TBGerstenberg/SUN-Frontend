import { userConstants } from "../_constants";
import { userService } from "../../../services";

const userActions = {
  register,
  login,
  logout
};

function register(firstName, lastName, email) {}

/**
 * Dispatches a login request, writing it's progess (requested, sucess, failure)
 * to the redux-store.
 * @param {*} email
 * @param {*} password
 */
function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  /**
   * Redux action creator dispatched when a login-request is started
   * @param {} user
   */
  function request(email) {
    return { type: userConstants.LOGIN_REQUEST, email };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

/**
 * Dispatches a logout request
 */
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export default userActions;
