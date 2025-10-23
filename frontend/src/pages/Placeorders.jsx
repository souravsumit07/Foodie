import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Placeorders = () => {
  const [cart, setCart] = useState({});
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch cart again for order page
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCart(res.data.cart);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart");
    }
  };

  // ✅ Fetch food details for cart items
  const fetchFoods = async () => {
    try {
      if (!cart || Object.keys(cart).length === 0) {
        setFoods([]);
        setLoading(false);
        return;
      }

      const ids = Object.keys(cart);
      const responses = await Promise.all(
        ids.map((id) =>
          axios.get(`http://localhost:3000/api/food/getFoodById/${id}`)
        )
      );

      const validFoods = responses
        .filter((res) => res.data.success && res.data.food)
        .map((res) => res.data.food);

      setFoods(validFoods);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching food details:", error);
      toast.error("Error fetching food details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      fetchFoods();
    }
  }, [cart]);

  // ✅ Calculate total
  const totalPrice = foods.reduce((acc, food) => {
    const quantity = cart[food._id] || 0;
    return acc + food.price * quantity;
  }, 0);

  // ✅ Handle confirm order
  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/order/placeOrder",
        { cart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Order placed successfully!");
        setCart({});
        setFoods([]);
        navigate("/"); // redirect to home or success page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  if (loading) return <p className="p-6">Loading your order...</p>;

  return (
    <div className="p-6 mt-30">
      <h2 className="text-2xl font-semibold mb-4">🧾 Order Summary</h2>

      {foods.length > 0 ? (
        <>
          {foods.map((food) => (
            <div
              key={food._id}
              className="flex justify-between items-center border-b pb-3 mb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={food.image}
                  alt={food.name}
                  width="80"
                  className="rounded-lg"
                />
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p>
                    ₹{food.price} × {cart[food._id]} = ₹
                    {food.price * cart[food._id]}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 border-t flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleConfirmOrder}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Confirm Order
            </button>
          </div>
        </>
      ) : (
        <p>No items in your order</p>
      )}
    </div>
  );
};

export default Placeorders;
