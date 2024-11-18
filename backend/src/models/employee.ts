import { required } from "joi";
import mongoose, { Schema, Document } from "mongoose";

interface Employee extends Document {
  _id: string;
  index: number;
  name: string;
  department: string;
  origin: string;
  email: string;
  birthday: string;
  linkedin: string;
  github: string;
}

const employeeSchema = new Schema({
  _id: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  origin: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: String, required: true },
  linkedin: { type: String, required: false },
  github: { type: String, required: false },
});

const employeeModel = mongoose.model<Employee>("Employee", employeeSchema);
export default employeeModel;
