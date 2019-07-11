// pageReducer.js - maps react components to redux actions
import { componentsMap as components } from "../_constants/navigation.constants";

/***************************************************************
 * Redux reducer that reacts to page-navigation-related redux-actions dispatched
 * by one or more action creatos and changes the application state accordingly.
 * Each reducer represents a first-level node in the application state
 * that is represented as a tree of JS-objects. This reducer manages
 * the first-level node called "page" and all objects nested in
 * lower levels of the state tree below the "page"-node. This part of the
 * component tree manages the currently visited location and tracks
 * location changes in exchange with the browser-history-API
 * The below "initialstate" is used to define how the state-tree
 * managed by this reducer looks like when initialized.
 **************************************************************/

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
