// React-speific packages
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// Component specific packages
import { configureRequestInterceptors } from "./api/interceptors";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// packages for internationalization
import { I18nextProvider } from "react-i18next";
import i18n from "./config/internationalization";
// packages to configure redux
import { Provider as ReduxStoreProvider } from "react-redux";
import store from "./redux/store";

// import the used UI Framework "Semantic UI"
import "./semantic/dist/semantic.min.css";
// custom components
import Spinner from "./01_atoms/Spinner";

// Configure API intercreptors to attach common headers to each request by default
configureRequestInterceptors();

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
