import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: [true, "Please provide a lecture title"],
    unique: true,
  },
  lectureDescription: {
    type: String,
    required: [true, "Please descritpion"],
    unique: true,
  },
  lectureViews: {
    type: Number,
    default: 0,
  },
  enrolledStudents: {
    type: Number,
    default: 0,
  },
  completedStudents: {
    type: Number,
    default: 0,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  PaymentStatus: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const Lecture =
  mongoose.models.lectures || mongoose.model("users", lectureSchema);

export default Lecture;
