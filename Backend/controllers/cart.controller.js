import { UserModel } from "../models/userModel.js";

//add-cart
export const addToCart = async (req, res) => {
  try {
    const userid = req.user.userId;
    const { itemId } = req.body;
    const user = await UserModel.findById(userid);
    if (!user) return res.json({ success: false, message: "User not found" });
    const cart = user.cart;

    if (cart[itemId]) {
      cart[itemId] += 1;
    } else {
      cart[itemId] = 1;
    }

    await UserModel.findByIdAndUpdate(userid, { cart });
    res.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};
export const removeFromCart = async (req, res) => {
    
};
// GET Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};
