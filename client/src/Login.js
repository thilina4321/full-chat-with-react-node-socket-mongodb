import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "./components/InputComponent";
import ButtonComponent from "./components/ButtonComponent";
import classes from "./auth.module.css";
import useHttp from "./hooks/useHttp";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // custom hook
  const [loginError, loginReq] = useHttp({
    url: "http://localhost:3500/login",
    data: { email: name, password },
    method: "post",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  const loginHan = async () => {
    setError("");
    if (!name || !password) {
      setError("Provide email and password");
      return;
    }

    const resJson = await loginReq();
    if (loginError) {
      setError("Something went wrong");
      return;
    }

    const user = resJson["user"];
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div className={classes.auth}>
      <InputComponent label="User Name" value={name} setValue={setName} />
      <InputComponent
        label="Password"
        value={password}
        setValue={setPassword}
        type="password"
      />
      {error && <p> {error} </p>}

      <div style={{ height: "50px" }}></div>
      <ButtonComponent name="Login" clickHandler={loginHan} />

      <p> Create Account ? </p>
      <ButtonComponent
        name="Sign Up"
        clickHandler={() => {
          navigate("/sign-up");
        }}
      />
    </div>
  );
};

export default Login;
