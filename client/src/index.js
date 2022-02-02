import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";

import { io } from "socket.io-client";
let server = io('http://localhost:3500');
global.socket = server

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
