import mongoose, { Schema, Document } from "mongoose";

interface employee extends Document {
  _id: string;
  index: number;
  name: string;
  department: string;
  description: string;
  flag: string;
  email: string;
  birthday: Date;
  linkedin: string;
  github: string;
}

const employeeSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  name: { type: String, required: true, maxlength: 100 },
  department: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  flag: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  birthday: { type: Date, required: true },
  linkedin: { type: String, maxlength: 100 },
  github: { type: String, maxlength: 100 },
});

const employeeModel = mongoose.model<employee>("Employee", employeeSchema);
export default employeeModel;
