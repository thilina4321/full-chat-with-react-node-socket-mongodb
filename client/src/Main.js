import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

const Main = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/home"} element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
