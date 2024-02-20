import express from "express";
import {
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

export default userRouter;
