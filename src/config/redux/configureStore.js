// configureStore.js
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { connectRoutes } from "redux-first-router";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import reduxThunk from "redux-thunk";

import * as actionCreators from "./_actions";
import * as reducers from "./_reducers";
import options from "./storeOptions";
import { routesMap } from "./_constants/navigation.constants";

export default function configureStore() {
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
  const store = createStore(rootReducer, enhancers);

  return { store, thunk };
}
