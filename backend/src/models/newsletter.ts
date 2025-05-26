import mongoose, { Schema, Document } from "mongoose";

interface Newsletter extends Document {
  _id: string;
  date: Date;
}

const newsletterSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  date: { type: Date, required: true, default: Date.now },
});

const newsletterrModel = mongoose.model<Newsletter>(
  "Newsletter",
  newsletterSchema
);
export default newsletterrModel;
