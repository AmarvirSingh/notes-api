import mongoose from "mongoose";

const UserScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  folderId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
});

export const UserModel = mongoose.model("User", UserScehma);
