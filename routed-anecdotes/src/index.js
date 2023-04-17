import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {AnecdoteContextProvider} from "./context/AnecdotesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AnecdoteContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AnecdoteContextProvider>
);
