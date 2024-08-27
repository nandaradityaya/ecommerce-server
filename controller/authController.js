import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

// ambil id user yg akan dibuat tokennya
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id); // ambil token berdasarkan user idnya

  const isDev = process.env.NODE_ENV === "development" ? false : true;

  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 1000), // buat token selama 6 hari dari sekarang
    httpOnly: true,
    security: isDev, // ambil securitynya berdasarkan variable isDev diatas. jika dia sudah production maka secruity: true
  };

  // simpan cookie ke dalam jwt, ambil token yg didapat
  res.cookie("jwt", token, cookieOption);

  user.password = undefined; // agar password tidak tersimpan di cookie

  res.status(statusCode).json({
    data: user,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0; // jika user di document blm ada maka jadikan dia sebagai owner (user pertama di webakan jadi owner)

  const role = isOwner ? "owner" : "user";

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
  });

  // kirim token dengan createUser, statuscode 201, dan kirim responnya
  createSendResToken(createUser, 201, res);
});
