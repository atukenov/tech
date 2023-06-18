import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import todoReducer from "./slices/todo";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  todo: todoReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
