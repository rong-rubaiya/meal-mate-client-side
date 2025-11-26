"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from 'framer-motion';

const cookers = [
  {
    id: 1,
    name: "Chef Alessandro",
    experience: "12 years",
    speciality: "Italian Cuisine",
    bio: "Master of authentic Italian dishes. Loves pasta, pizza, and fresh ingredients.",
    image: "https://www.shutterstock.com/image-photo/restaurant-kitchen-portrait-confident-chef-600nw-2645077225.jpg",
  },
  {
    id: 2,
    name: "Chef Sophia",
    experience: "8 years",
    speciality: "Pastry & Desserts",
    bio: "Expert pastry chef. Famous for cakes, tarts, and chocolate creations.",
    image: "https://chefworks.co.za/cdn/shop/files/ChefHatWhite-82212s_3.jpg?v=1740583055&width=2048",
  },
  {
    id: 3,
    name: "Chef Miguel",
    experience: "10 years",
    speciality: "Grill & BBQ",
    bio: "BBQ specialist. Loves smoked meats and outdoor grilling.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJiGRFWPUoGa0TgvJsPXi1Wd7yEQUOMt2PiiKM-734qe6h79WGsJvyLFi0okE-XDSHBAs&usqp=CAU",
  },
  {
    id: 4,
    name: "Chef Lin",
    experience: "6 years",
    speciality: "Asian Fusion",
    bio: "Combines flavors from East Asia to create unique fusion dishes.",
    image: "https://www.escoffier.edu/wp-content/uploads/2022/03/Smiling-male-chef-with-white-coat-and-hat-768.jpg",
  },
];

export default function Cookers() {
  const [activeCooker, setActiveCooker] = useState(null);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <motion.h2
        className="text-5xl font-bold text-center mb-12 fontext"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Meet the Masters
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cookers.map((cooker) => (
          <motion.div
            key={cooker.id}
            className="relative card bg-green-900 shadow-lg rounded-lg p-4 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setActiveCooker(cooker.id)}
            onMouseLeave={() => setActiveCooker(null)}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-yellow-400">
              <img
                src={cooker.image}
                alt={cooker.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl text-[#F7F2E2] font-semibold">{cooker.name}</h3>
            <p className="text-gray-300">{cooker.experience} experience</p>
            <p className="text-gray-400 italic">{cooker.speciality}</p>
            <div className="flex mt-2 space-x-1 text-orange-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Hover overlay for details */}
            {activeCooker === cooker.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-orange-500/30 to-yellow-400/20 backdrop-blur-sm text-white flex flex-col justify-center items-center p-4 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg font-bold mb-2 text-gray-900">{cooker.name}</h4>
                <p className="text-sm text-[#F7F2E2]">{cooker.bio}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
