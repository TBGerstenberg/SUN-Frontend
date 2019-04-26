import { combineReducers } from "redux";
import authReducer from "./loginReducer";
import pageReducer from "./pageReducer";
import registrationReducer from "./registrationReducer";

const combinedReducers = combineReducers({
  authReducer,
  pageReducer,
  registrationReducer
});

export default combinedReducers;
