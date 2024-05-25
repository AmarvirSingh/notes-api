import mongoose from "mongoose";
import express from "express";
import { FolderModel } from "../models/Folders.js";
import { TasksModel } from "../models/Tasks.js";

const router = express.Router();

// we can add task from this post request
router.post("/", async (req, res) => {
  const { taskName, folderId } = req.body;

  // if post request is sent without any task we will send ta array of tasks avaible in folder collection
  if (!taskName) {
    return res.json({
      message: "there is no task to add ",
    });
  }

  const task = await new TasksModel({ name: taskName });
  await task.save();
  const folder = await FolderModel.findById(folderId);
  folder.taskId.push(task._id);
  await folder.save();

  // sending response with status code of 201 and array of tasks  in tasks key
  res
    .status(201)
    .json({ message: "here is your folder data", taskId: folder._id });
});

// this request to recieve all the tasks with given fodler id
router.post("/getTasks", async (req, res) => {
  const { folderId } = req.body;

  const folderdata = await FolderModel.find({ _id: folderId }).populate(
    "taskId"
  );

  if (!folderdata) {
    return res.status(202).json({ message: "No tasks available " });
  }
  res
    .status(201)
    .json({ tasks: folderdata[0].taskId, message: "tasks send successfully" });
});

router.post("/delete", async (req, res) => {
  const { noteId } = req.body;

  console.log(noteId);

  const something = await TasksModel.deleteOne({ _id: noteId });
  console.log(something);
  res.status(201).json({ message: "deleted successfully" });
});

export { router as taskRouter };
