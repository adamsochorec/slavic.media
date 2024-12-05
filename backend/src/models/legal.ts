import mongoose, { Schema, Document } from "mongoose";

interface legal extends Document {
  _id: string;
  title: string;
  modified: string;
  content: string[];
}

const legalSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  modified: { type: String, required: true, maxlength: 50 },
  content: { type: [String], required: true },
});

const legal = mongoose.model<legal>("Legal", legalSchema);
export default legal;
