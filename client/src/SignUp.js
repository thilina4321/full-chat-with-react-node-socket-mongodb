import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHan = async () => {
    const res = await axios.post("http://localhost:3500/user", {
      data: { email: email, password: password },
    });
    const resJson = res.data;
    const user = resJson["user"];
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    // navigate("/login");
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
        value={password}
        style={{ width: "100%" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ height: "50px" }}></div>
      <button onClick={loginHan}> Sign Up </button>
    </div>
  );
};

export default SignUp;
