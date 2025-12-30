import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBoxOpen,
  FaPhoneAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrackOrders = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getOrderDetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      toast.error("Please login");
      navigate("/");
      return;
    }
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start pt-28 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-7 border border-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaBoxOpen className="text-5xl text-gray-800 mb-2" />
          <h2 className="text-3xl font-black">Track Orders</h2>
          <p className="text-xs text-gray-500">{email}</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-5 text-center">
          <p className="text-sm font-bold">{name}</p>
          <p className="text-xs text-gray-600">{email}</p>
        </div>

        {/* Orders */}
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                whileHover={{ x: 6 }}
                className="group bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FaBoxOpen className="text-xl text-black" />
                    <div className="flex gap-4 items-center">
                      {/* Product Image */}
                      <img
                        src={order.items[0]?.image}
                        alt={order.items[0]?.productName}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />

                      {/* Product Details */}
                      <div>
                        <p className="text-sm font-bold">
                          {order.items[0]?.productName}
                        </p>

                        <p className="text-xs text-gray-600">
                          ₹{order.items[0]?.price}
                        </p>

                        <p className="text-xs text-gray-600">
                          Quantity: {order.items[0]?.quantity}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          Order ID: {order.receipt || order._id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <FaArrowRight className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>

                <div className="mt-3 text-xs text-gray-700 flex justify-between">
                  <span>
                    Order Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <span
                    className={`font-semibold ${
                      order.status === "paid"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => toast("Contact support at +91 7000548268")}
            className="flex-1 bg-gray-100 text-black py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <FaPhoneAlt /> Contact Support
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 border border-black py-3 rounded-xl text-sm font-bold text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackOrders;
