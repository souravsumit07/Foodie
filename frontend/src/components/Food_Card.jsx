import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Food_Card = ({ food }) => {
  const [isCart, setIsCart] = useState(false);

  // ✅ Check if this item is already in user's cart
  useEffect(() => {
    const checkCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/cart/getCart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && res.data.cart) {
          // If this food ID exists in the cart, set isCart to true
          if (res.data.cart[food._id]) {
            setIsCart(true);
          }
        }
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    checkCart();
  }, [food._id]); // Run this when component loads or food changes

  const handleCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      if (!isCart) {
        // ADD ITEM
        const res = await axios.post(
          "http://localhost:3000/api/cart/addToCart",
          { itemId: food._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setIsCart(true);
          toast.success("Item added to cart!");
        }
      } else {
        // REMOVE ITEM
        const res = await axios.post(
          "http://localhost:3000/api/cart/removeFromCart",
          { itemId: food._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setIsCart(false);
          toast.info("Item removed from cart!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
      data-aos="zoom-in"
    >
      <img
        src={food.image}
        alt={food.name}
        className="object-cover rounded-lg w-full"
      />

      <div className="flex justify-between items-center mt-3">
        <h3 className="font-semibold text-lg">{food.name}</h3>
        <img src={assets.rating_starts} alt="rating" className="h-4" />
      </div>

      <p className="text-gray-500 text-sm mt-1">{food.description}</p>

      <div className="flex justify-between items-center mt-3">
        <p className="font-bold text-orange-500">₹{food.price}</p>
        <button
          onClick={handleCart}
          className={`px-3 py-1 rounded ${
            isCart ? "bg-green-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {isCart ? "Remove" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default Food_Card;
