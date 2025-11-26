"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegClock, FaChartPie, FaUtensils, FaFilter, FaUserShield } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <FaRegClock className="w-8 h-8 text-white" />,
      title: "Track Meals",
      desc: "Track your meals in real-time and stay on top of your diet.",
      color: "bg-orange-500",
    },
    {
      id: 2,
      icon: <FaRegClock className="w-8 h-8 text-white" />,
      title: "Meal Reminders",
      desc: "Set reminders for each meal so you never miss one.",
      color: "bg-green-500",
    },
    {
      id: 3,
      icon: <FaChartPie className="w-8 h-8 text-white" />,
      title: "Monthly Stats",
      desc: "See monthly meal stats & track your expenses easily.",
      color: "bg-blue-500",
    },
    {
      id: 4,
      icon: <FaFilter className="w-8 h-8 text-white" />,
      title: "Filter Meals",
      desc: "Filter meals by type: Breakfast, Lunch, Dinner.",
      color: "bg-purple-500",
    },
    {
      id: 5,
      icon: <FaUserShield className="w-8 h-8 text-white" />,
      title: "Admin View",
      desc: "Hostel authorities can manage and view all meals.",
      color: "bg-red-500",
    },
  ];

  // Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold fontext">
          Key Features
        </h2>
        <p className="text-gray-600 mt-2">
          Discover what makes Meal-Mate so convenient for students and admins.
        </p>
      </div>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            className="flex flex-col items-start p-6 bg-orange-300 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-amber-500 transition-all cursor-pointer"
          >
            <div className={`p-4 rounded-xl mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
