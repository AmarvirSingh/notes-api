import mongoose from "mongoose";
import e from "express";
import { FolderModel } from "../models/Folders.js";
import { UserModel } from "../models/Users.js";

const router = e.Router();

router.post("/", async (req, res) => {
  const { folderName, userId } = req.body;
  const folder = await new FolderModel({ title: folderName });
  folder.save();
  //console.log(folder._id);
  const user = await UserModel.findById(userId);
  console.log(user.folderId);
  user.folderId.push(folder._id);
  await user.save();

  //console.log(user);
  res.json({
    message: `folder Created Successfully with folder id: ${folder._id}`,
    folderId: folder._id,
  });
});

router.post("/getAllFolders", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ message: "noUser" });
  }
  const userFound = await UserModel.find({ _id: userId }).populate("folderId");

  //i am able to send folder names by populating the data
  // next step is to add tasks and modify routes

  res.json({ folderNames: userFound[0].folderId });
});

export { router as folderRoute };
