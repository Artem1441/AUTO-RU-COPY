import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";
import { adminUpdateReducer } from "./adminUpdateReducer";
import { addAutoReducer } from "./client/addAutoReducer";
import { otherCategoriesReducer } from "./otherCategoriesReducer";
import { getAutoReducer } from "./client/getAutoReducer";
import { reloadReducer } from "./reloadReducer";
import { chatReducer } from "./client/chatReducer";

const rootReducer = combineReducers({
  userName: userReducer,
  adminName: adminReducer,
  adminUpdateName: adminUpdateReducer,
  clientAddAuto: addAutoReducer,
  clientGetAuto: getAutoReducer,
  otherCategories: otherCategoriesReducer,
  reloadName: reloadReducer,
  chatName: chatReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
