require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";
import jwt from "jsonwebtoken";

const scheduleSchema : Schema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
      },
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      },
  },
  { timestamps: true }
);



scheduleSchema.plugin(DiffPlugin);

const scheduleModel = mongoose.model("User", scheduleSchema);

export default scheduleModel;
