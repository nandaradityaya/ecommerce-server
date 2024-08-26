import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const port = 3000;

//Middleware
app.use(express.json()); // agar bisa memasukan data json di req body
app.use(express.urlencoded({ extended: true }));

import authRouter from "./routes/authRouter.js";

// Parent Router
app.use("/api/v1/auth", authRouter);

app.use(notFound); // munculkan jika notFound
app.use(errorHandler); // munculkan jika error

// server running
app.listen(port, () => {
  console.log(`Apps running in port ${port}`);
});

// Connection DB
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("DB CONNECT");
  })
  .catch((err) => {
    console.log(err);
  });
