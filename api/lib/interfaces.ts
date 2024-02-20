require("dotenv").config();
import mongoose from "mongoose";



export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}
