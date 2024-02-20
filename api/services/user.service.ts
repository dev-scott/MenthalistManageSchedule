import { Response } from "express";
import userModel from "../models/user.model";
import { MongoClient } from "mongodb";

// get user by id

const dbUrl: string = process.env.DB_URL || "";

const client = new MongoClient(dbUrl);

export const getUserById = async (id: string, res: Response) => {};

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    users,
  });
};
