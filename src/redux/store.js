import configureStore from "./configureStore";

/**
 * This file exists to minimize the number of config-calls that would clutter
 * the main App.js file. With this import structure, a redux store is configured
 * by just importing it from this file.
 */
const store = configureStore().store;
export default store;
