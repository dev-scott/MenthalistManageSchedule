require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import availabilityModel from "../models/availability.model";

export const GetAvailabilities = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const availabilities = await availabilityModel.find();
      res.json(availabilities);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }
);

export const AddAvailabilities = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    const {date,startTime , endTime} = req.body;
    const availability = new availabilityModel({
  date , startTime , endTime
      });
    
      try {
        const newAvailability = await availability.save();
        res.status(201).json(newAvailability);
      } catch (err:any) {
        res.status(400).json({ message: err.message });
      }
  }
);
