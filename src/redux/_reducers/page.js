// pageReducer.js - maps react components to redux actions
import { componentsMap as components } from "../_constants/navigation.constants";

export default (state = "HOME", action = {}) =>
  components[action.type] || state;
