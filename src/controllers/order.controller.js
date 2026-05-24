import Order from "../models/order.model.js";


// GET all orders
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {

    console.error("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};



// CREATE order
export const createOrder = async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });

  } catch (error) {

    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};



// UPDATE order
export const updateOrder = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedOrder =
      await Order.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });

  } catch (error) {

    console.error("Update Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};



// DELETE order
export const deleteOrder = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedOrder =
      await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });

  } catch (error) {

    console.error("Delete Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};