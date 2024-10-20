import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from "../controller/productController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// CRUD Product

// Create Data Product
// POST : /api/v1/product
// middleware owner
router.post("/", protectedMiddleware, adminMiddleware, createProduct); // protect routenya dengan middleware dan adminMiddleware agar hanya admin yg bisa akses

// Read Data Product
// GET : /api/v1/product
router.get("/", allProduct);

// Read Detail Data Product
// GET : /api/v1/product/:id
router.get("/:id", detailProduct);

// Update Detail Data Product
// PUT : /api/v1/product/:id
// middleware owner
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

// Read Detail Data Product
// DELETE : /api/v1/product/:id
// middleware owner
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

// File Update Data Product
// POST : /api/v1/product/file-upload
// middleware owner
router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"), // handler untuk upload
  fileUpload
);

export default router;
