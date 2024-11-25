import mongoose, { Schema } from "mongoose";

interface event extends Document {
  _id: number;
  date: Date;
  event: string;
  icon: string;
}
const eventSchema = new Schema({
  _id: { type: Number, required: true },
  date: { type: String, required: true },
  event: { type: String, required: true },
  icon: { type: String, required: true },
});

const event = mongoose.model<event>("Event", eventSchema);
export default event;
