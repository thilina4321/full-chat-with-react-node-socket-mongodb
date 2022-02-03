import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import classes from "./auth.module.css";
import useHttp from "../../hooks/useHttp";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // custom hook
  const signupReq = useHttp({
    url: "http://localhost:3500/user",
    data: { email: name, password },
    method: "post",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  const signupHandler = async () => {
    setError("");
    if (!name || !password) {
      setError("Provide email and password");
      return;
    }

    const { data: resJson, error } = await signupReq();
    if (error) {
      setError("Something went wrong");
      return;
    }
    const user = resJson["user"];
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  // UI part
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
      <ButtonComponent name="Sin Up" clickHandler={signupHandler} />
    </div>
  );
};

export default SignUp;
