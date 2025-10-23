import { OrderModel } from "../models/orderModel.js";
import { FoodModel } from "../models/foodModel.js";
import { UserModel } from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cart } = req.body;

    if (!cart || Object.keys(cart).length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const [foodId, qty] of Object.entries(cart)) {
      const food = await FoodModel.findById(foodId);
      if (food) totalPrice += food.price * qty;
    }

    const newOrder = new OrderModel({
      userId,
      items: cart,
      totalPrice,
    });

    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cart: {} });

    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { _id } = req.params;
    await OrderModel.findByIdAndDelete(_id);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
