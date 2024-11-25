import mongoose, { Schema } from "mongoose";

interface legal extends Document {
  _id: string;
  title: string;
  modified: string;
  content: string[];
}

const legalSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  modified: { type: String, required: true },
  content: { type: [String], required: true },
});

const legal = mongoose.model<legal>("Legal", legalSchema);
export default legal;
