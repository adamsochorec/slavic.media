import mongoose, { Schema } from "mongoose";

interface asset extends Document {
  _id: string;
  type: string;
  title: string;
  desc: string;
  icon: string;
}

const assetSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true },
});

const asset = mongoose.model<asset>("Asset", assetSchema);
export default asset;
