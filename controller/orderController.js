import asyncHandler from "../middlewares/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  return res.status(201).json({
    message: "Berhasil Buat Order Product",
  });
});

export const allOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Berhasil Tampil Semua Order Product",
  });
});

export const detailOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Berhasil Tampil Semua Order Product",
  });
});

export const currentUserOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Berhasil Tampil Current User Order Product",
  });
});
