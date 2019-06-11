// packagrs to configure the axios http client
import axios from "axios";
import store from "../redux/store";

export const configureRequestInterceptors = () => {
  // Add a request interceptor
  axios.interceptors.request.use(function(config) {
    const token = store.getState().login.accessToken;

    config.headers.Authorization = token;

    return config;
  });
};
