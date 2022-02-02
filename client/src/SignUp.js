import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  const loginHan = async () => {
    setError("");
    if (!email || !password) {
      setError("Provide email and password");
      return;
    }
    const res = await axios.post("http://localhost:3500/user", {
      data: { email: email, password: password },
    });
    const resJson = res.data;
    const user = resJson["user"];
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };
  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        minWidth: "400px",
        gap: "10px",
      }}
    >
      <label>User Name :</label>
      <input
        style={{ width: "100%", height: "30px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password :</label>

      <input
        value={password}
        style={{ width: "100%", height: "30px" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ height: "50px" }}></div>
      <button
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "purple",
          color: "white",
        }}
        onClick={loginHan}
      >
        {" "}
        Sign Up{" "}
      </button>
      {error && <p> {error} </p>}
    </div>
  );
};

export default SignUp;
