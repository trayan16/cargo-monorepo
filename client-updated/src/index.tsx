import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {App} from "./App";
import { mobileVersionWidth } from "./utils";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Anton";
    @media screen and (max-width: ${mobileVersionWidth}px) {
      padding: 0;
    }
  }
  `;
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();