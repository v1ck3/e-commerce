import React from "react";
import { motion } from "framer-motion";

const Support = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-black/10 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-10 border-b border-black/10">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Support Center
          </h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Need help with your orders, account, or anything else?  
            We’re here to support you every step of the way.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-6 p-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2"> Orders & Shipping</h3>
            <p className="text-sm text-gray-600 mb-4">
              Track orders, delivery timelines, and shipping updates.
            </p>
            <button className="text-sm font-semibold text-black hover:underline">
              View Order Help →
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2"> Account & Login</h3>
            <p className="text-sm text-gray-600 mb-4">
              Issues with login, OTP, or profile settings.
            </p>
            <button className="text-sm font-semibold text-black hover:underline">
              Account Support →
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-bold mb-2"> Payments & Refunds</h3>
            <p className="text-sm text-gray-600 mb-4">
              Payment failures, refunds, and billing queries.
            </p>
            <button className="text-sm font-semibold text-black hover:underline">
              Payment Help →
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-black text-white p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Still need help?</h3>
            <p className="text-sm text-gray-300">
              Contact our support team for personalized assistance.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="mailto:support@vexus.com"
              className="bg-white text-black px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
            >
              Email Support
            </a>
            <a
              href="tel:+919000000000"
              className="border border-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white hover:text-black transition-all"
            >
              Call Us
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Support;
