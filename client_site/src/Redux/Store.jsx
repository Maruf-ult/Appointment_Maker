import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./AlertSlice";

const rootReducer = combineReducers({
     alerts:alertSlice.reducer,
});

const store = configureStore({
     reducer:rootReducer,
});

export default store;