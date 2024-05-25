import mongoose, { mongo } from "mongoose";

const FolderSchema = mongoose.Schema({
  title: {
    type: String,
  },
  taskId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const FolderModel = mongoose.model("Folder", FolderSchema);
