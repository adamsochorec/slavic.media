import mongoose, { Schema, Document } from "mongoose";

interface img extends Document {
  _id: string;
  alt: string;
  title: string;
  flag: string;
}

const imgSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  alt: { type: String, required: true, maxlength: 200 },
  title: { type: String, required: true, maxlength: 200 },
  flag: { type: String, required: true, maxlength: 2 },
});

const img = mongoose.model<img>("Img", imgSchema);
export default img;
