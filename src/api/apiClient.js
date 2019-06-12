// packagrs to configure the axios http client
import axios from "axios";
import store from "../redux/store";

export function configureApiClient() {
  axios.interceptors.request.use(function(config) {
    const token = store.getState().login.accessToken;

    config.headers.Authorization = token;

    console.log("Creating axios interceptor");
    return config;
  });
}

const apiClient = axios;

export default apiClient;
