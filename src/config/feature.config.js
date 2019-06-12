export const FEATURE_CONFIG = {
  authentication: {
    persistLoginState: true,
    // Configure automatic redirects when trying to access a route unauthenticated that is protected.
    redirectToLoginWhenAccessingProtectedRoutesUnauthenticated: true,
    // Persist login information in localstorage when the user is about to close a tab
    persistLoginStateOnClose: true,
    // Persist login information periodically
    persistLoginStatePeriodically: true
  }
};
