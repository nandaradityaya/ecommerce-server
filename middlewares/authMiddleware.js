import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// untuk proteksi halaman yg ingin menggunakan middleware
export const protectedMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // isi variable tokennya dengan cookies yg berisi jwt
  token = req.cookies.jwt;

  if (token) {
    try {
      // ambil id user berdasarkan token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ambil user yg login berdasarkan id
      req.user = await User.findById(decoded.id).select("-password"); // semua tampil kecuali password
      next();
    } catch (error) {
      res.status(401); // unauthorized
      throw new Error("Not Authorized token fail");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});

// middleware untuk admin
export const adminMiddleware = (req, res, next) => {
  // jika kita dapat request usernya & user tsb adalah owner
  if (req.user && req.user.role === "owner") {
    next();
  } else {
    res.status(401); // unauthorized
    throw new Error("Not Authorized as Owner");
  }
};
