import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBoxOpen, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  { id: "ORD-10291", item: "Rockstar Hoodie", status: "Shipped", date: "25 Dec 2025" },
  { id: "ORD-10292", item: "Vintage Cap", status: "Processing", date: "24 Dec 2025" },
  { id: "ORD-10293", item: "Concert Ticket", status: "Delivered", date: "22 Dec 2025" },
];

const TrackOrders = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

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

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ x: 6 }}
              className="group bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaBoxOpen className="text-xl text-black" />
                  <div>
                    <p className="text-sm font-bold">{order.id}</p>
                    <p className="text-xs text-gray-600">{order.item}</p>
                  </div>
                </div>
                <FaArrowRight className="text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>

              <div className="mt-3 text-xs text-gray-700 flex justify-between">
                <span>📅 {order.date}</span>
                <span className="font-semibold text-black">{order.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

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
