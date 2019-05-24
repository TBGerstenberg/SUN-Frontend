/**
 * Loads a redux-state that has been persisted to localstorage into the redux store.
 */
export const loadReduxState = () => {
  try {
    const serializedState = localStorage.getItem("SUN-Application-State");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Saves the state of the redux-store to localstorage.
 */
export const saveReduxState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("SUN-Application-State", serializedState);
  } catch {
    // ignore write errors
  }
};
