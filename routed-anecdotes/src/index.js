import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {AnecdoteContextProvider} from "./context/AnecdotesContext";
import {NotificationContextProvider} from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AnecdoteContextProvider>
    <NotificationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationContextProvider>
  </AnecdoteContextProvider>
);
