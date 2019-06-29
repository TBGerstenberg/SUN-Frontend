import { userConstants } from "../_constants";

const initialState = {
  loggedIn: false
};

const attachRolesToUser = user => {
  let roles = [];
  if (user.admin) {
    roles.push("ADMIN");
  }
  user.roles = roles;
  return user;
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTRATION_SUCCESS:
      //Tempoary workaround that changes the users admin status to an array containing his roles as strings
      // as this eases the auth filtering
      let user = action.payload.user;
      user = attachRolesToUser(user);

      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: user,
        accessToken: action.payload.token
      };

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.email
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: attachRolesToUser(action.payload.user, action.payload.user.admin),
        accessToken: action.payload.token
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.error
      };
    case userConstants.LOGOUT_REQUEST:
      return { ...state, loggingOut: true };
    case userConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        accessToken: null,
        user: null,
        loggedIn: false
      };
    case userConstants.LOGOUT_FAILURE:
      return { ...state, loggingOut: false };

    case userConstants.ADD_SUBSCRIPTION: {
      const userHasSubscribedToChair = state.user.person.subscriptions.find(
        element => {
          return element.pageId === action.payload.subscription.pageId;
        }
      );

      if (!userHasSubscribedToChair) {
        let mutatedSubscriptions = [...state.user.person.subscriptions];
        mutatedSubscriptions.push(action.payload.subscription);

        return {
          ...state,
          user: {
            ...state.user,
            person: {
              ...state.user.person,
              subscriptions: mutatedSubscriptions
            }
          }
        };
      } else {
        return { ...state };
      }
    }

    case userConstants.REMOVE_SUBSCRIPTION: {
      const indexOfChair = state.user.person.subscriptions.findIndex(
        element => {
          return element.pageId === action.payload.subscription.pageId;
        }
      );

      const userHasSubscribedToChair = indexOfChair !== -1;

      if (userHasSubscribedToChair) {
        let mutatedSubscriptions = [...state.user.person.subscriptions];
        mutatedSubscriptions.splice(indexOfChair);

        return {
          ...state,
          user: {
            ...state.user,
            person: {
              ...state.user.person,
              subscriptions: mutatedSubscriptions
            }
          }
        };
      } else {
        return { ...state };
      }
    }

    default:
      return state;
  }
};

export default loginReducer;
