require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

/*****cors error protection and data parsing*****/

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"], // Si vous utilisez des cookies, exposez-les pour le navigateur
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ajoutez les méthodes nécessaires pour votre application
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// routes
app.use("/api/v1", userRouter);

// testing api
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to the otherside🙂",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(ErrorMiddleware);

export default () => connectDB().then(() => app);
