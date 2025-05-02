import mongoose, { Schema, Document } from "mongoose";

interface review extends Document {
  _id: number;
  img: string;
  name: string;
  occupation: string;
  profileLink: string;
  rating: number;
  fullReview: string;
  message: string;
}

const reviewSchema = new Schema({
  _id: { type: Number, required: true },
  img: { type: String, required: true, maxlength: 100 },
  name: { type: String, required: true, maxlength: 50 },
  occupation: { type: String, required: true, maxlength: 50 },
  profileLink: { type: String, required: true, maxlength: 100 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  fullReview: { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 1000 },
});

const review = mongoose.model<review>("Review", reviewSchema);
export default review;
