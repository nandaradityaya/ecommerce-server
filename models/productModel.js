import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama Product Harus diisi"],
    unique: [true, "Nama product sudah digunakan"],
  },
  price: {
    type: Number,
    required: [true, "Harga Product Harus diisi"],
    unique: [true, "Username sudah didaftarkan"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi produk Harus diisi"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Category Product Harus diisi"],
    enum: ["Sepatu", "Kemeja", "Baju", "Celana"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
