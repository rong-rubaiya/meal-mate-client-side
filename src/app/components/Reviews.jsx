"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BACKEND_URL = "https://y-one-rose.vercel.app";

export default function TopReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch top-rated reviews
  const fetchTopReviews = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/topratings/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopReviews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading top reviews...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">Top Reviews</h2>
        <button
          onClick={() => router.push("/reviews")}
          className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            className="relative bg-white rounded-full shadow-lg p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Plate-style circular card */}
            <div className="w-48 h-48 sm:w-52 sm:h-52 bg-gradient-to-t from-yellow-100 via-orange-50 to-white rounded-full shadow-inner flex flex-col justify-center items-center p-4 text-center">
              <img
                src={review.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                alt={review.email}
                className="w-16 h-16 rounded-full border-2 border-orange-400 mb-2 object-cover"
              />
              <p className="text-sm font-semibold mb-2">{review.email}</p>
              <p className="text-gray-700 text-xs mb-2">{review.review}</p>
              <p className="text-orange-500 font-bold mt-1">{review.rating.toFixed(1)} ★</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
