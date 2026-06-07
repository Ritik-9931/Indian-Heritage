import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import store from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1039710183578-7llht8hdbf6800e5omab1d038m31s7mo.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </GoogleOAuthProvider>,
);
