// packagrs to configure the axios http client
import axios from "axios";
import store from "../redux/store";

/**
 * Configure the the API-client that is used in all the service-classes in this project.
 * Adds the logged-in users access token to each request.
 * NOTE: This strategy risks Cross-Site-Request-Forgery, for example as
 * a result of a phising attack, in which the user clicks a link and performs a request
 * using the token he/she has been granted from a previous login.
 */
export function configureApiClient() {
  axios.interceptors.request.use(function(config) {
    const token = store.getState().login.accessToken;

    config.headers.Authorization = token;

    return config;
  });
}

const apiClient = axios;

export default apiClient;
