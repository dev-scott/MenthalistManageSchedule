require("dotenv").config();
import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../lib/interfaces";
import DiffPlugin from "mongoose-history-diff";
import jwt from "jsonwebtoken";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],

      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};


userSchema.plugin(DiffPlugin);

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
