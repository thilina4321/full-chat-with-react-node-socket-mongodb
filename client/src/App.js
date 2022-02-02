import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import Friends from "./Friends";
// import axios from "axios";

const App = () => {
  const [chat, setChat] = useState(false);
  const [friends, setFriends] = useState([]);
  const [seleFri, setSeleFri] = useState("");
  const socket = global.socket;
  const navigate = useNavigate();

  useEffect(async () => {
    // const abCn = new AbortController();
    // await axios("http://localhost:3500/name", { signal: abCn.signal });
    const me = JSON.parse(localStorage.getItem("user"));
    socket.emit("getFriends");
    socket.on("users", (users) => {
      users = users.filter((user) => user.id !== me.id);
      setFriends((_) => [...users]);
    });
    socket.on("message", (msgs) => {});

    // return () => {
    //   abCn.abort();
    //   console.log("app");
    // };
  }, []);

  const setChatWithFri = (id) => {
    setChat(true);
    setSeleFri(id);
  };

  console.log("log");

  return (
    <div>
      <p
        style={{
          display: "flex",
          marginRight: "30px",
          cursor: "pointer",
          justifyContent: "flex-end",
        }}
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        {" "}
        Logout{" "}
      </p>
      {!chat ? (
        <Friends friends={friends} setChatWithFri={setChatWithFri} />
      ) : (
        <Chat setChat={setChat} friend={seleFri} />
      )}
    </div>
  );
};

export default App;
