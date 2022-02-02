import mongoose, { Schema } from "mongoose";

// users attributes
interface ChatAttrs {
  users?: any[];
  messages?: any[];
}

// describe user model to asign static methods to the modal
interface ChatModel extends mongoose.Model<ChatDoc> {
  build(attrs: ChatAttrs): ChatDoc;
}

// single documents properties
interface ChatDoc extends mongoose.Document {
  users?: any[];
  messages?: any[];
}
const chatRoom = new Schema(
  {
    users: [],
    messages: [{ msg: { type: String }, owner: { type: String } }],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

chatRoom.statics.build = (attrs: ChatAttrs) => {
  return new Chat(attrs);
};

const Chat = mongoose.model<ChatDoc, ChatModel>("chat", chatRoom);

export { Chat };
