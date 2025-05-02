import mongoose, { Schema, Document } from "mongoose";

interface Event extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  description: string;
  lat: number;
  lng: number;
  icon: string;
}

const eventSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  date: { type: Date, required: true },
  description: { type: String, required: true, maxlength: 500 },
  lat: { type: Number, required: true, maxlength: 500 },
  lng: { type: Number, required: true, maxlength: 500 },
  icon: { type: String, required: true, maxlength: 50 },
});

const eventModel = mongoose.model<Event>("Event", eventSchema);
export default eventModel;
