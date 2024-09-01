import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body); // ambil semua request yg ada di body lalu create

  return res.status(201).json({
    message: "Berhasil tambah Product",
    data: newProduct, // tampilin data yg berhasil dibuat
  });
});

export const allProduct = asyncHandler(async (req, res) => {
  res.send("All Product");
});

export const detailProduct = asyncHandler(async (req, res) => {
  res.send("Detail Product");
});

export const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload Product");
});
