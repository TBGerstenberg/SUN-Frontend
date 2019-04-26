// pageReducer.js
import { NOT_FOUND } from "redux-first-router";

/**
 * Maps keys in the redux-first-router part of the redux-store to actual react components.
 */
const components = {
  HOME: "Home",
  USER: "User",
  [NOT_FOUND]: "NotFound"
};

/**
 * Changes state in the redux store that is provided by redux-first-router
 * @param {C} state - state of the redux store
 * @param {*} action - action that is supposed to change the state
 */
const pageReducer = (state = "HOME", action = {}) => {
  return components[action.type] || state;
};

export default pageReducer;
