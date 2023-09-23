import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", //database collection name not variable
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const task = mongoose.model("Task", schema);
