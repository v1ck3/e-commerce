import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-black/10 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Info */}
          <div className="p-10 bg-black text-white flex flex-col justify-center">
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="text-sm text-gray-300 mb-8 leading-relaxed">
              Have questions, feedback, or need support?  
              Our team is always ready to help you.
            </p>

            <div className="space-y-4 text-sm">
              <p> New Delhi, India</p>
              <p> support@vexus.com</p>
              <p> +91 90000 00000</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
