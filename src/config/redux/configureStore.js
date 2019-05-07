// configureStore.js
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { connectRoutes } from "redux-first-router";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

import * as actionCreators from "./_actions";
import * as reducers from "./_reducers";
import options from "./storeOptions";

const routesMap = {
  HOME: "/home",
  PROFILE: "/profile",
  LOGIN: "/"
};

export default function configureStore(history) {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    routesMap,
    options
  );

  const composeEnhancers = (...args) =>
    typeof window !== "undefined"
      ? composeWithDevTools({ actionCreators })(...args)
      : compose(...args);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, enhancers);

  /*
  if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./_reducers", () => {
      const reducers = require("./_reducers").default;
      const rootReducer = combineReducers({ ...reducers, location: reducer });
      store.replaceReducer(rootReducer);
    }); 
  } */

  return { store, thunk };
}
