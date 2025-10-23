import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch user's cart
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view your cart");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setCart(res.data.cart || {});
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart");
    }
  };

  // ✅ Add item
  const handleAdd = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/addToCart",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) setCart(res.data.cart);
      else toast.error(res.data.message);
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Error adding item");
    }
  };

  // ✅ Remove item
  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/removeFromCart",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) setCart(res.data.cart);
      else toast.error(res.data.message);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  // ✅ Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Fetch all food details for the cart items
  useEffect(() => {
    const fetchAllFoods = async () => {
      if (!cart || Object.keys(cart).length === 0) {
        setFoods([]);
        return;
      }

      try {
        const ids = Object.keys(cart);
        const responses = await Promise.all(
          ids.map((id) => axios.get(`http://localhost:3000/api/food/getFoodById/${id}`))
        );

        const validFoods = responses
          .filter((res) => res.data.success && res.data.food)
          .map((res) => res.data.food);

        setFoods(validFoods);
      } catch (error) {
        console.error("Error fetching food details:", error);
        toast.error("Error fetching food details");
      }
    };

    fetchAllFoods();
  }, [cart]);

  // ✅ Calculate total price
  const totalPrice = foods.reduce((acc, food) => {
    const quantity = cart[food._id] || 0;
    return acc + food.price * quantity;
  }, 0);

  // ✅ Place order handler
  const handlePlaceOrder = () => {
    if (foods.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/order"); // redirect to order page
  };

  return (
    <div className="p-6 mt-30">
      <h2 className="text-2xl font-semibold mb-4">🛒 Your Cart</h2>

      {foods.length > 0 ? (
        <>
          {foods.map((food) => (
            <div
              key={food._id}
              className="flex items-center justify-between gap-4 mb-3 p-3 border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={food.image}
                  alt={food.name}
                  width="100"
                  className="rounded-lg"
                />
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p>₹{food.price}</p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRemove(food._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  −
                </button>
                <span className="font-semibold">{cart[food._id] || 0}</span>
                <button
                  onClick={() => handleAdd(food._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* ✅ Total and Place Order */}
          <div className="mt-6 p-4 border-t flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handlePlaceOrder}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default Cart;
