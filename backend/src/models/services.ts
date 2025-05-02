import mongoose, { Schema, Document } from "mongoose";

interface service extends Document {
  _id: string;
  index: number;
  description: string;
  icon: string;
}

const serviceSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  description: { type: String, required: true, maxlength: 1000 },
  icon: { type: String, required: true, maxlength: 50 },
});

const service = mongoose.model<service>("Service", serviceSchema);
export default service;
