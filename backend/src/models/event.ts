import mongoose, { Schema, Document } from "mongoose";

interface event extends Document {
  _id: number;
  date: string;
  event: string;
  lat: number;
  lng: number;
  icon: string;
}

const eventSchema = new Schema({
  _id: { type: Number, required: true },
  date: { type: String, required: true, maxlength: 50 },
  event: { type: String, required: true, maxlength: 500 },
  lat: { type: Number, required: true, maxlength: 500 },
  lng: { type: Number, required: true, maxlength: 500 },
  icon: { type: String, required: true, maxlength: 50 },
});

const eventModel = mongoose.model<event>("Event", eventSchema);
export default eventModel;
