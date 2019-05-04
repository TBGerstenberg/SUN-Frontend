// React-speific packages
import React from "react";
import ReactDOM from "react-dom";
// Component specific packages
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// packages for internationalization
import { I18nextProvider } from "react-i18next";
import i18n from "../config/internationalization";
// package to build upon a previously exiting browser history
import createHistory from "history/createBrowserHistory";
// packages to configure redux
import { Provider as ReduxStoreProvider } from "react-redux";
import configureReduxStore from "../config/redux/configureReduxStore";

const history = createHistory();
const store = configureReduxStore(history);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
