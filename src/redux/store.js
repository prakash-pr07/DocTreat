// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // ✅ Make sure you create this

const store = configureStore({
  reducer: {
    auth: authReducer,  // You can add more reducers here like `user`, `cart`, etc.
  },
});

export default store;
