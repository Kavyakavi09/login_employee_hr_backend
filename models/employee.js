import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);
