import express from "express";

import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();


// GET all orders
router.get("/", getOrders);


// CREATE order
router.post("/", createOrder);


// UPDATE order
router.put("/:id", updateOrder);


// DELETE order
router.delete("/:id", deleteOrder);


export default router;