import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./routes/userRoute.js";
import { folderRoute } from "./routes/folderRoute.js";
import { taskRouter } from "./routes/taskRoute.js";
const app = express();

app.use(
  cors({
    origin: ["https://notes-app-nine-sandy.vercel.app"],
    methods: ["GET, POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", userRouter);
app.use("/addFolder", folderRoute);
app.use("/addTasks", taskRouter);
app.get("/", (req, res) => {
  res.send("<h2 >Hello world</h2>");
});

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

mongoose.connect(process.env.DATABASE_URI, clientOptions);

app.listen(3001, console.log("Server is runnning at port 3001"));
