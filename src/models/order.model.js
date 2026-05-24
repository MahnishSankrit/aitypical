import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },

    product_name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;