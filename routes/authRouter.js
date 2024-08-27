import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controller/authController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// post /api/v1/auth/register
router.post("/register", registerUser);

// post /api/v1/auth/login
router.post("/login", loginUser);

// get /api/v1/auth/logout | protect route ini dengan middleware yg sudah kita buat dan kirim func logoutUser untuk menghapus token user agar ke logout
router.get("/logout", protectedMiddleware, logoutUser);

// get /api/v1/auth/getuser
router.get("/getuser", protectedMiddleware, getCurrentUser);

export default router;
