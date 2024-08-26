// Import the mongoose module to interact with MongoDB
import mongoose, { Schema } from "mongoose";

// Import the 'os' module to use its 'type' function
import { type } from "os";

// Interface representing a document in MongoDB.
interface IImg extends Document {
  title: string;
  alt: string;
  src: string;
}

// Schema corresponding to the document interface.
const imgSchema: Schema = new Schema({
  title: { type: String, required: true },
  alt: { type: String, required: true },
  src: { type: String, required: true },
});

// Create a Model
const Img = mongoose.model<IImg>("Img", imgSchema);
export default Img;
