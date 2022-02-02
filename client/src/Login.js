import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      navigate("/home");
    }
  }, []);

  const loginHan = async () => {
    const res = await axios.post("http://localhost:3500/login", {
      data: { email: email, password: password },
    });
    const resJson = res.data;
    const user = resJson["user"];
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  };
  return (
    <div style={{ width: "90%", margin: "10px auto" }}>
      <label>Email :</label>
      <input
        style={{ width: "100%" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password :</label>
      <input
        style={{ width: "100%" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ height: "50px" }}></div>
      <button onClick={loginHan}> Login </button>
    </div>
  );
};

export default Login;
