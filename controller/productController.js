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
  const data = await Product.find(); // panggil model Product lalu find menggunakan mongoose

  return res.status(200).json({
    message: "Berhasil tampil semua product",
    data: data, // panggil datanya
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id; // ambil nama parameternya yg ada di productRouter.js (saat ini nama paramsnya id)
  const productData = await Product.findById(paramsId); // panggil model Product lalu findById menggunakan mongoose berdasarkan params yg di inputkan

  if (!productData) {
    res.status(404);
    throw new Error("ID tidak ditemukan");
  }
  return res.status(200).json({
    message: "Berhasil tampil product details",
    data: productData, // panggil datanya
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id; // ambil nama parameternya yg ada di productRouter.js (saat ini nama paramsnya id)
  const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
    runValidators: false,
    new: true,
  }); // panggil model Product lalu findByIdAndUpdate menggunakan mongoose berdasarkan params yg di inputkan dan ambil request bodynya yg berisi option

  return res.status(201).json({
    message: "Berhasil Update Product",
    data: updateProduct, // panggil datanya
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id; // ambil nama parameternya yg ada di productRouter.js (saat ini nama paramsnya id)

  await Product.findByIdAndDelete(paramsId); //panggil model Product lalu findByIdAndDelete menggunakan mongoose berdasarkan params yg di inputkan

  return res.status(201).json({
    message: "Berhasil Delete Product",
  });
});

export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload Product");
});
