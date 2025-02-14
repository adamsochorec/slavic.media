import mongoose, { Schema, Document } from "mongoose";

interface video extends Document {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: string;
  desc: string;
}

const videoSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  url: { type: String, required: true, maxlength: 100 },
  year: { type: String, required: true, maxlength: 4 },
  desc: { type: String, maxlength: 100 },
});

const video = mongoose.model<video>("video", videoSchema);
export { videoSchema };
export default video;
