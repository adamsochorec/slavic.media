import mongoose, { Schema, Document } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

interface Review extends Document {
  _id: number;
  img: string;
  name: string;
  occupation: string;
  profileLink: string;
  rating: number;
  fullReview: string;
  message: string;
}

const ReviewSchema = new Schema({
  img: { type: String, required: true, maxlength: 100 },
  name: { type: String, required: true, maxlength: 50 },
  occupation: { type: String, required: true, maxlength: 50 },
  profileLink: { type: String, required: true, maxlength: 100 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  fullReview: { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 1000 },
});

ReviewSchema.plugin(AutoIncrement, { id: "review_seq", inc_field: "_id" });

const Review = mongoose.model<Review>("Review", ReviewSchema);
export default Review;
