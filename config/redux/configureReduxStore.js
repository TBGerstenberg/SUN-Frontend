import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connectRoutes } from "redux-first-router";
import page from "../../_reducers/pageReducer";
import routesMap from "./routesMap.js";

/**
 * Configures a redux store
 * @param {object} preloadedState - A redux store state to be used on the first page load, allows to fetch state from a server
 */
export default function configureStore(preloadedState) {
  const { reducer, middleware, enhancer } = connectRoutes(routesMap);

  const rootReducer = combineReducers({ page, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);
  return store;
}
