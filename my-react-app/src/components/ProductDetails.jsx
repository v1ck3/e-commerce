import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Shop from "./Shop";
import { FaLongArrowAltLeft } from "react-icons/fa";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8520/api/v1/merch/${id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center font-black">
        Loading Product...
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <section className="pt-32 pb-24 px-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* 🔙 Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-sm font-bold hover:-translate-x-1 transition"
          >
            <FaLongArrowAltLeft className="text-sm" /> Back
          </button>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Image */}
            <div className="rounded-[2.5rem] overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                Limited Edition
              </span>

              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold mb-6">
                ₹{product.price}
              </p>

              <p className="text-gray-600 leading-relaxed mb-10">
                {product.description ||
                  "Premium streetwear crafted for modern style."}
              </p>

              <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <Shop limit={4} />
    </>
  );
};

export default ProductDetails;
