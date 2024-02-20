require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";
import jwt from "jsonwebtoken";

const availabilitySchema : Schema = new mongoose.Schema(
  {
    date: {
        type: Date,
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



availabilitySchema.plugin(DiffPlugin);

const availabilityModel = mongoose.model("User", availabilitySchema);

export default availabilityModel;
