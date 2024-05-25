import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "user already exist! Please LOGIN" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  newUser.save();

  if (newUser) {
    return res.json({
      message: "User Created Successfully",
      user: newUser._id,
      username: newUser.username,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(203).json({ message: "User Doesnot exist " });
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) {
    res.status(201);
    return res.json({ message: "wrong username or password " });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);
  res.status(202);
  res.json({ token, userId: user._id, username: user.username, user: user });
});

export { router as userRouter };
