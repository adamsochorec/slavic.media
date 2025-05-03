import mongoose, { Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<User>("User", UserSchema);
export default User;
