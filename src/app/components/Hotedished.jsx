"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { FaStar } from "react-icons/fa";

export default function Hotedished() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("https://meal-mate-server-lake.vercel.app/top-rated-meals")
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.error("Failed to fetch dishes:", err));
  }, []);

  if (!dishes.length) return null; // or a loader

  return (
    <section className="w-full py-10">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl fontext font-bold text-center mb-16">
        Today's Hot Dishes
      </h2>

      {/* Marquee */}
      <div className="overflow-hidden w-full ">
        <motion.div
          className="flex gap-6 "
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {[...dishes, ...dishes].map((dish, index) => (
            <motion.article
              key={dish._id + "-" + index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-t-full overflow-hidden border border-gray-200 shadow-sm w-sm  flex-shrink-0"
            >
              {/* Image */}
              <div className="relative h-36 w-full">
               <img
  src={dish.image || "/placeholder.png"}
  alt={dish.name}
  className="w-full h-full object-cover rounded-t-full"
/>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
                <p className="text-sm text-gray-500">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">৳{dish.price}</span>
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <FaStar /> {dish.reviews}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{dish.category}</p>
                <p className="text-xs text-gray-400">Posted by: {dish.posted_by}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
