import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
// const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://utkarsh:9876@nodejs-practise.gqwalnv.mongodb.net/")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
