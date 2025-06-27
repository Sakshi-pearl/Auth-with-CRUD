import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    designation: {
      type: String,
      default: "",
    },
    team: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    experience: {
      type: Number,
      min: [0, "Experience must be at least 0"],
      default: 0,
    },
    documents: {
      type: String, // For now assume single file URL or filename
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
