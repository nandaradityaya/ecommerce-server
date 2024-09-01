import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from "../controller/productController.js";

const router = express.Router();

// CRUD Product

// Create Data Product
// POST : /api/v1/product
// middleware owner
router.post("/", createProduct);

// Read Data Product
// GET : /api/v1/product
router.get("/", allProduct);

// Read Detail Data Product
// GET : /api/v1/product/:id
router.get("/:id", detailProduct);

// Update Detail Data Product
// PUT : /api/v1/product/:id
// middleware owner
router.put("/:id", updateProduct);

// Read Detail Data Product
// DELETE : /api/v1/product/:id
// middleware owner
router.delete("/:id", deleteProduct);

// File Update Data Product
// POST : /api/v1/product/file-upload
// middleware owner
router.post("/file-upload", fileUpload);

export default router;
