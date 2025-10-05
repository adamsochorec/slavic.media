import mongoose, { Schema, Document } from "mongoose";

interface Employee extends Document {
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
  imdb: string;
}

const EmployeeSchema = new Schema({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  name: { type: String, required: true, maxlength: 100 },
  department: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  flag: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: false, unique: false, maxlength: 100 },
  birthday: { type: Date, required: true },
  linkedin: { type: String, maxlength: 100 },
  github: { type: String, maxlength: 100 },
  imdb: { type: String, maxlength: 100 },
});

// Auto-increment index before saving a new document
EmployeeSchema.pre("save", async function (next) {
  if (this.isNew && (this.index === undefined || this.index === null)) {
    const lastEmployee = await mongoose
      .model<Employee>("Employee")
      .findOne({})
      .sort({ index: -1 })
      .select("index")
      .exec();
    this.index =
      lastEmployee && typeof lastEmployee.index === "number"
        ? lastEmployee.index + 1
        : 1;
  }
  next();
});
const EmployeeModel = mongoose.model<Employee>("Employee", EmployeeSchema);
export default EmployeeModel;
