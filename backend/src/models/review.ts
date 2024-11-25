import mongoose, { Schema } from "mongoose";

interface review extends Document {
  _id: number;
  img: string;
  name: string;
  role: string;
  profileLink: string;
  rating: number;
  fullReview: string;
  message: string;
}

const reviewSchema = new Schema({
  _id: { type: Number, required: true, unique: true },
  img: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  profileLink: { type: String, required: true },
  rating: { type: Number, required: true },
  fullReview: { type: String, required: true },
  message: { type: String, required: true },
});

const review = mongoose.model<review>("Review", reviewSchema);
export default review;
