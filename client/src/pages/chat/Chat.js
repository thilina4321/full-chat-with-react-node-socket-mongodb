import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = (props) => {
  const { friend: fid, setChat } = props;
  const { id } = JSON.parse(localStorage.getItem("user"));

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = global.socket;
  const messageEl = useRef();
  const navigate = useNavigate();

  const handlerAllMessages = (msgs) => {
    setMessages((_) => [...msgs]);
    scrollToBottom();
  };
  const handlerMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("getAllMessages", { id, fid });
    socket.on("messages", handlerAllMessages);
    socket.on("message", handlerMessage);

    return () => {
      socket.off("messages", handlerAllMessages);
      socket.off("message", handlerMessage);
    };
  }, [id, fid, socket]);

  const sendMsg = () => {
    socket.emit("sendMessage", { msg, id, fid });
    setMsg("");
  };

  console.log(id, "id");
  return (
    <div style={{ width: "90%", margin: "auto", height: "100%" }}>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Chat App
      </h1>

      <div style={{ height: "80%" }}>
        {messages.map(({ msg, _id, owner }) => (
          <div
            key={_id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                backgroundColor: id === owner ? "black" : "green",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              {id === owner ? "Me" : "Fr"}
            </p>{" "}
            <p
              style={{
                padding: "15px",
                backgroundColor: id === owner ? "green" : "black",
                color: "white",
                borderRadius: "10px",
                width: "60%",
              }}
            >
              {msg}
            </p>
          </div>
        ))}
        <div ref={messageEl} style={{ height: "50px" }}>
          {" "}
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          width: "100%",
          position: "fixed",
          bottom: "5px",
        }}
      >
        <input
          style={{ flex: 0.6, zIndex: 2, height: "25px" }}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button style={{ flex: 0.3 }} onClick={sendMsg}>
          {" "}
          SEND{" "}
        </button>
      </div>
    </div>
  );
};

export default Chat;
