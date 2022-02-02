// model
import { Chat } from "./model/chat-room";
import { User } from "./model/user";
import { Server } from "socket.io";
import { server } from "./index";

const socket = () => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("connect to the frontend");

    // get users
    socket.on("getFriends", async () => {
      const users = await User.find();
      io.emit("users", users);
    });

    // get all messages
    socket.on("getAllMessages", async (opt) => {
      let room;
      let messages;

      // find chat room
      let chatRoom = await Chat.findOne({ users: { $all: [opt.fid, opt.id] } });

      // if chat room available get id, otherwise create chat room and get id
      if (chatRoom) {
        room = chatRoom.id;
        messages = chatRoom.messages;
      } else {
        let chatRoom = Chat.build({});
        chatRoom.users = chatRoom.users?.concat([opt.id, opt.fid]);
        const chat = await chatRoom.save();
        room = chat.id;
        messages = [];
      }

      socket.join(room);
      io.to(room).emit("messages", messages);
    });

    // send messages
    socket.on("sendMessage", async (opt) => {
      let room;

      // find chat room
      let chatRoom = await Chat.findOne({ users: { $all: [opt.fid, opt.id] } });
      let _id;

      // if chat room available get id, otherwise create chat room and get id
      if (chatRoom) {
        room = chatRoom.id;
        chatRoom.messages = chatRoom.messages?.concat({
          msg: opt.msg,
          owner: opt.id,
        });

        await chatRoom.save();
        const length = chatRoom.messages && chatRoom.messages?.length - 1;
        _id = length && chatRoom.messages && chatRoom.messages[length]._id;
      } else {
        let chatRoom = Chat.build({});
        chatRoom.users = chatRoom.users?.concat([opt.id, opt.fid]);
        chatRoom.messages = chatRoom.messages?.concat({
          msg: opt.msg,
          owner: opt.id,
        });

        const chat = await chatRoom.save();
        room = chat.id;
        const length = chatRoom.messages && chatRoom.messages?.length - 1;
        _id = length && chatRoom.messages && chatRoom.messages[length]._id;
      }

      socket.join(room);
      io.to(room).emit("message", { msg: opt.msg, owner: opt.id, _id });
    });

    socket.on("disconnect", () => {
      console.log("user left");
    });
  });
};

export { socket };
