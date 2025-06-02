import express from 'express';
import { listOrders, updateStatus, userOrders, placeOrderCod, deleteOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", userOrders);
orderRouter.post("/place", placeOrderCod); // single place route (COD only)
orderRouter.post("/status", updateStatus);
orderRouter.delete("/delete/:id", deleteOrder);

export default orderRouter;
