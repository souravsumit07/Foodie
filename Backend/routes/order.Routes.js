import express from "express";
import { placeOrder, getOrders, deleteOrder } from "../controllers/order.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeOrder", authMiddleware, placeOrder);
orderRouter.get("/getOrders", authMiddleware, getOrders);
orderRouter.delete("/deleteOrder/:_id", authMiddleware, deleteOrder);

export default orderRouter;
