import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userRegisterLoginReducer } from "./reducers/userReducers";


const reducer = combineReducers({
  userRegisterLogin: userRegisterLoginReducer,
});


const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

//pass value in inital state
//Creating initial state to store data in Localstorage
const INITIAL_STATE = {
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;