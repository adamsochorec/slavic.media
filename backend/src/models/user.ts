// Import the mongoose module to interact with MongoDB
import mongoose, { Schema } from "mongoose";

// Interface representing a document in MongoDB.
interface userInterface extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

// Schema corresponding to the document interface.
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

// Create a Model
const User = mongoose.model<userInterface>("User", userSchema);
//Export the model
export default User;
