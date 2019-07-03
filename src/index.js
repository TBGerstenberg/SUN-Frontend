// React-speific packages
import i18next from "i18next";
import moment from "moment-with-locales-es6";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// packages for internationalization
import { I18nextProvider } from "react-i18next";
// packages to configure redux
import { Provider as ReduxStoreProvider } from "react-redux";
// custom components
import Spinner from "./01_atoms/Spinner";
// Component specific packages
import App from "./App";
import i18n from "./config/internationalization";
import store from "./redux/store";
// import the used UI Framework "Semantic UI"
import "./semantic/dist/semantic.min.css";
import * as serviceWorker from "./serviceWorker";

moment.locale(i18next.language.substr(0, 2));

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ReduxStoreProvider store={store}>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </ReduxStoreProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
