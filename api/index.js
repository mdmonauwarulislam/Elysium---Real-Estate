import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

//I need apllication string
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
//allowing json form as input
app.use(express.json());

app.use(cookieParser());

const corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//api route
//req is from client
//res is from server

app.use("/api/user", userRouter);

//middleware-I use it in auth.controller
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});