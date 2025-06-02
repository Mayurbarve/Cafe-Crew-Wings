import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  customer: {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    tableNo: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: true } // Always true for COD
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
