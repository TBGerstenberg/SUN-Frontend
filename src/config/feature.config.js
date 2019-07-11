/**
 * Central configuration for feature-switches that allow to completely turn a feature of
 * the system - that may be implemented accross varios files - to be turned on or off.
 * Useful for A/B Testing.
 */
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
