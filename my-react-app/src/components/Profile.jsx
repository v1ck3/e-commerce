import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaEdit, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [addressPanel, setAddressPanel] = useState(false);

  const userId = localStorage.getItem("_id");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const [addressForm, setAddressForm] = useState({
    userId,
    houseNo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });


  // 🔥 Fetch Address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(`http://localhost:8520/api/v1/address/${userId}`);
        const data = await res.json();

        if (!data.address) return;
        setAddress(data.address);

        // Pre-fill form
        setAddressForm({
          userId,
          houseNo: data.address.houseNo || "",
          street: data.address.street || "",
          city: data.address.city || "",
          state: data.address.state || "",
          postalCode: data.address.postalCode || "",
          country: data.address.country || "",
        });
      } catch {
        toast.error("Unable to load address");
      }
    };

    if (userId) fetchAddress();
  }, [userId]);

  // Save Address (POST or PUT auto-detect)
  const handleSaveAddress = async () => {
  try {
    const url = address
      ? `http://localhost:8520/api/v1/address/${userId}`
      : `http://localhost:8520/api/v1/address`;

    const res = await fetch(url, {
      method: address ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressForm),
    });

    const data = await res.json();
    if (!data.address) return toast.error("Update failed");

    setAddress(data.address);
    toast.success(address ? "Address updated!" : "Address saved!");
    setAddressPanel(false);
  } catch (err) {
    console.error(err);
    toast.error("Server error while updating");
  }
};

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start pt-28 px-4">

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-7 border border-gray-200"
      >
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-7xl text-gray-800 mb-2" />
          <h1 className="text-3xl font-black">{name}</h1>
          <p className="text-xs text-gray-500">ID: {userId}</p>
          <p className="text-sm text-gray-600">{email}</p>
        </div>

        {/* Address Display */}
        <motion.div className="mt-6 bg-gray-50 p-5 rounded-2xl border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold flex items-center gap-2">
              <FaMapMarkerAlt /> Address
            </p>

            <FaEdit
              onClick={() => setAddressPanel(true)}
              className="cursor-pointer hover:translate-x-2 transition-all duration-300"
            />
          </div>

          {!address ? (
            <p className="text-xs text-gray-500 mt-2">No address added yet</p>
          ) : (
            <div className="text-sm text-gray-700 mt-3 space-y-1">
              <p>{address.houseNo}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.postalCode}</p>
              <p>{address.country}</p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button onClick={handleLogout} className="flex-1 bg-black text-white py-3 rounded-xl text-sm font-bold">
            <FaSignOutAlt className="inline mr-2"/> Logout
          </button>
        </div>
      </motion.div>

      {/* Sidebar for Address Edit */}
      <AnimatePresence>
        {addressPanel && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddressPanel(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-[90%] max-w-md bg-white z-50 p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <FaMapMarkerAlt /> Edit Address
                </h3>
                <button onClick={() => setAddressPanel(false)} className="text-xl text-gray-500 hover:text-black">✕</button>
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col gap-4">
                <input placeholder="House No" value={addressForm.houseNo} onChange={(e)=>setAddressForm({...addressForm, houseNo: e.target.value})} className="border p-3 rounded-xl text-sm"/>
                <input placeholder="Street" value={addressForm.street} onChange={(e)=>setAddressForm({...addressForm, street: e.target.value})} className="border p-3 rounded-xl text-sm"/>
                <input placeholder="City" value={addressForm.city} onChange={(e)=>setAddressForm({...addressForm, city: e.target.value})} className="border p-3 rounded-xl text-sm"/>
                <input placeholder="State" value={addressForm.state} onChange={(e)=>setAddressForm({...addressForm, state: e.target.value})} className="border p-3 rounded-xl text-sm"/>
                <input placeholder="Postal Code" value={addressForm.postalCode} onChange={(e)=>setAddressForm({...addressForm, postalCode: e.target.value})} className="border p-3 rounded-xl text-sm"/>
                <input placeholder="Country" value={addressForm.country} onChange={(e)=>setAddressForm({...addressForm, country: e.target.value})} className="border p-3 rounded-xl text-sm"/>
              </div>

              <button onClick={handleSaveAddress} className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold text-sm cursor-pointer hover:opacity-90">
                Save Address
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
