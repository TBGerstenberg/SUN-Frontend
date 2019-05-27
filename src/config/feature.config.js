export const FEATURE_CONFIG = {
  authentication: {
    // Configure automatic redirects when trying to access a route unauthenticated that is protected.
    redirectToLoginWhenAccessingProtectedRoutesUnauthenticated: false,
    // Persist login information in localstorage when the user is about to close a tab
    persistLoginStateOnClose: true,
    // Persist login information periodically
    persistLoginStatePeriodically: false
  }
};
