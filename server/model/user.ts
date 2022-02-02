import mongoose, { Schema } from "mongoose";

// users attributes
interface UserAttrs {
  email: string;
  password: string;
}

// describe user model to asign static methods to the modal
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// single documents properties
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const user = new Schema(
  {
    email: String,
    password: String,
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret._v;
      },
    },
  }
);

user.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", user);

export { User };
