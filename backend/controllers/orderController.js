// === BACKEND: Updated userOrders Controller ===
import orderModel from "../models/orderModel.js";

const deliveryCharge = 50;

const placeOrderCod = async (req, res) => {
  try {
    const newOrder = new orderModel({
      customer: req.body.customer,
      items: req.body.items,
      amount: req.body.amount,
      payment: false,
    });

    await newOrder.save();
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

const userOrders = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.json({ success: false, message: "Email not provided" });
    }

    const orders = await orderModel.find({ "customer.email": email });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};


export {
  placeOrderCod,
  listOrders,
  userOrders,
  updateStatus,
  deleteOrder
};