import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const TasksModel = mongoose.model("Task", TaskSchema);
