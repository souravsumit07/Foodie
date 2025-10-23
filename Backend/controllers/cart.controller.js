import { UserModel } from "../models/userModel.js";

// ADD to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cart = user.cart || {};

    if (cart[itemId]) {
      cart[itemId] += 1;
    } else {
      cart[itemId] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cart });
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// REMOVE from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cart = user.cart || {};

    if (cart[itemId]) {
      if (cart[itemId] > 1) {
        cart[itemId] -= 1;
      } else {
        // if only 1 left, remove the item completely
        delete cart[itemId];
      }
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    await UserModel.findByIdAndUpdate(userId, { cart });
    res.json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// GET cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cart: user.cart || {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};
