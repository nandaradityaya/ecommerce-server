import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body; // request body di postman

  // cek keranjangnya kosong atau tidak
  if (!cartItem || cartItem.length < 0) {
    res.status(400);
    throw new Error("Keranjang masih kosong");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error("id product tidak ditemukan");
    }

    const { name, price, _id } = productData;
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };
    orderItem = [...orderItem, singleProduct];

    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  return res.status(201).json({
    total,
    order,
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
