import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { userRouter } from "./router/user";
import { socket } from "./socket";

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

const port = 3500;

const start = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/chat-so-no-re");
    console.log("connect to db");
  } catch (error) {
    console.log("Failed to connect to db");
  }
};

start();

export const server = app.listen(port, () => {
  console.log("server runs on port ", port);
});

socket();

// socker.emit() -- only for this socker
// socker.broadcast.emit() -- all socket expect this socket
// io.emit() -- all socket
