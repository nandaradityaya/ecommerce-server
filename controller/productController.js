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
  // Req Query
  const queryObj = { ...req.query }; // spread operator agar querynya kita bisa request lebih dari 1

  // Fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ["page", "limit", "name"];
  excludeField.forEach((element) => delete queryObj[element]); // hapus query page dan limit pada saat search query di jalankan

  // console.log(queryObj);

  let query;

  // gunakan regex agar kita bisa searching berdasarkan karakter yg di input pada query
  if (req.query.name) {
    query = Product.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  } else {
    query = Product.find(queryObj); // find berdasarkan query params
  }

  // Pagination
  const page = req.query.page * 1 || 1; // parsing page query ke integer atau return halaman 1
  const limitData = req.query.limit * 1 || 30; // parsing limit query ke interger atau return sebanyak 30 data
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments();
  // jika query page terisi
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error("This page does not exist");
    }
  }

  const data = await query;

  return res.status(200).json({
    message: "Berhasil tampil semua product",
    data: data, // panggil datanya
    count: countProduct,
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
  const file = req.file; // ambil file yg di upload oleh user

  if (!file) {
    res.status(400);
    throw new Error("Tidak ada file yang diinput");
  }

  const imageFileName = file.filename;
  const pathImageFile = `/uploads/${imageFileName}`;

  res.status(200).json({
    message: "Image berhasil diupload",
    image: pathImageFile,
  });
});
