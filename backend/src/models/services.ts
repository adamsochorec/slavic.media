import mongoose, { Schema } from "mongoose";

interface service extends Document {
  _id: string;
  index: number;
  desc: string;
  icon: string;
}

const serviceSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  index: { type: Number, required: true, unique: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true },
});

const service = mongoose.model<service>("Service", serviceSchema);
export default service;
