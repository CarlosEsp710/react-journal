import { combineReducers } from "redux";

import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "./notesReducer";
import { uiReducer } from "../reducers/uiReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  ui: uiReducer,
});
