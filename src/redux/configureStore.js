// configureStore.js
import throttle from "lodash/throttle";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { connectRoutes } from "redux-first-router";
import reduxThunk from "redux-thunk";
import { configureApiClient } from "../api/apiClient";
import { FEATURE_CONFIG } from "../config/feature.config";
import {
  loadReduxState,
  saveReduxState
} from "../services/localStorageService";
import options from "./storeOptions";
import * as actionCreators from "./_actions";
import { routesMap } from "./_constants/navigation.constants";
import * as reducers from "./_reducers";

export default function configureStore() {
  // Load persisted state from local storage only if the feature switch is set to true.
  let persistedState = {};
  if (FEATURE_CONFIG.authentication.persistLoginState) {
    persistedState = loadReduxState();
  }

  let { reducer, middleware, enhancer } = connectRoutes(routesMap, options);

  const composeEnhancers = (...args) =>
    typeof window !== "undefined"
      ? composeWithDevTools({ actionCreators })(...args)
      : compose(...args);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware, reduxThunk);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, persistedState, enhancers);

  configureApiClient();

  // Write to local storage every time a change is taking place in redux.insecure,
  // NOTE: Saving Access tokens and login state in Browser storage is considered
  // as its vulnerable to XSS Attacks. In the future, using an http-only cookie
  // may be the better option.
  if (FEATURE_CONFIG.authentication.persistLoginStateOnClose) {
    // Persist login state in localstorage before the user closes the tab/window
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      const state = store.getState();
      saveReduxState({
        login: {
          accessToken: state.login.accessToken,
          user: state.login.user,
          loggedIn: state.login.loggedIn
        }
      });
    });
  }

  if (FEATURE_CONFIG.authentication.persistLoginStatePeriodically) {
    // Writing to local storage periodically is expensive, since its using JSON.stringify internally.
    // We use lodashs "throttle" to execute the function only every 300ms, no matter how often
    // the redux-store subscription (on every change in redux store) triggers.

    const state = store.getState();
    store.subscribe(
      throttle(() => {
        saveReduxState({
          login: {
            accessToken: state.login.accessToken,
            user: state.login.user,
            loggedIn: state.login.loggedIn
          }
        });
      }, 2000)
    );
  }

  return { store };
}
