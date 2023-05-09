import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ashen
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./Store";
import { BrowserRouter } from "react-router-dom";

// ashen

//Hasa
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state"
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";
import {Route, Routes } from "react-router-dom";
import authReducer from './features/auth/authSlice'
import { apiSlice } from './app/api/apiSlice'
import dataReducer from './state/updateSlice'

//Hasa
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    auth:authReducer,
    data:dataReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware,apiSlice.middleware),
});
setupListeners(store.dispatch) ;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
      <Provider store={store}>
    
        <App />
        </Provider>
      
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
