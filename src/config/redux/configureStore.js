// configureStore.js
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { connectRoutes } from "redux-first-router";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import reduxThunk from "redux-thunk";

import * as actionCreators from "./_actions";
import * as reducers from "./_reducers";
import options from "./storeOptions";
import { routesMap } from "./_constants/navigation.constants";
import {
  loadReduxState,
  saveReduxState
} from "../../services/localStorageService";

import { FEATURE_CONFIG } from "../feature.config";
import throttle from "lodash/throttle";

export default function configureStore() {
  // Load persisted state from local storage only if the feature switch is set to true.
  let persistedState = {};
  if (FEATURE_CONFIG.authentication.persistLoginState) {
    persistedState = loadReduxState();
  }

  let { reducer, middleware, enhancer, thunk } = connectRoutes(
    routesMap,
    options
  );

  const composeEnhancers = (...args) =>
    typeof window !== "undefined"
      ? composeWithDevTools({ actionCreators })(...args)
      : compose(...args);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware, reduxThunk);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, persistedState, enhancers);

  // Write to local storage every time a change is taking place in redux.insecure,
  // NOTE: Saving Access tokens and login state in Browser storage is considered
  // as its vulnerable to XSS Attacks. In the future, using an http-only cookie
  // may be the better option.
  if (FEATURE_CONFIG.authentication.persistLoginStateOnClose) {
    // Persist login state in localstorage before the user closes the tab/window
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      saveReduxState({
        login: store.getState().login
      });
    });
  }

  if (FEATURE_CONFIG.authentication.persistLoginStatePeriodically) {
    // Writing to local storage periodically is expensive, since its using JSON.stringify internally.
    // We use lodashs "throttle" to execute the function only every 300ms, no matter how often
    // the redux-store subscription (on every change in redux store) triggers.
    store.subscribe(
      throttle(() => {
        saveReduxState({
          login: store.getState().login
        });
      }, 2000)
    );
  }

  return { store, thunk };
}
