import mongoose, { Schema, Document } from "mongoose";

interface Newsletter extends Document {
  _id: string;
  source: string;
  firstName: string;
  lastName: string;
  date: Date;
}

const newsletterSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  source: { type: String, required: true, maxlength: 100 },
  firstName: { type: String, required: false, maxlength: 100 },
  lastName: { type: String, required: false, maxlength: 100 },
  date: { type: Date, required: true, default: Date.now },
});

const newsletterrModel = mongoose.model<Newsletter>(
  "Newsletter",
  newsletterSchema
);
export default newsletterrModel;
