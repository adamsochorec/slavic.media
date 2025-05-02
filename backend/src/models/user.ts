import mongoose, { Schema } from "mongoose";

interface user extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const userSchema: Schema = new Schema({
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

const user = mongoose.model<user>("User", userSchema);
export default user;
