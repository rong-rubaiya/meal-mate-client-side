"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Pre-existing 30 reviews
const initialReviews = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  message: `This is review number ${i + 1}. Loved the food and service!`,
}));

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      name: "You",
      message: input.trim(),
    };

    setReviews([newReview, ...reviews]); // new review on top
    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl fontext font-bold text-center mb-8">What Our Residents Say</h2>

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Write your review..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition"
        >
          Submit
        </button>
      </form>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="relative bg-white rounded-full shadow-lg p-6 flex flex-col justify-center items-center text-center cursor-pointer"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Plate-style circular card */}
            <div className="w-40 h-40 sm:w-44 sm:h-44 bg-gradient-to-t from-yellow-100 via-orange-50 to-white rounded-full shadow-inner flex flex-col justify-center items-center p-4 text-center">
              <p className="text-sm font-semibold mb-2">{review.name}</p>
              <p className="text-gray-700 text-xs">{review.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
