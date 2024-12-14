import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  allOrder,
  detailOrder,
  currentUserOrder,
} from "../controller/orderController.js";

const router = express.Router();

// POST /api/v1/order
// hanya bisa di akses oleh user yg sudah auth
router.post("/", protectedMiddleware, createOrder);
router.get("/", protectedMiddleware, adminMiddleware, allOrder);
router.get("/:id", protectedMiddleware, adminMiddleware, detailOrder);
router.get("/current/user", protectedMiddleware, currentUserOrder);

export default router;
