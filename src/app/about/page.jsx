"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { GiMeal, GiChefToque, GiClockwork } from "react-icons/gi";
import { MdFastfood, MdOutlineFeedback } from "react-icons/md";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !complaint) {
      Swal.fire("Error", "Please fill in all fields", "warning");
      return;
    }
    try {
      const res = await fetch("https://meal-mate-server-lake.vercel.app/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, complaint }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Thank you!", "Your complaint has been submitted.", "success");
        setName("");
        setEmail("");
        setComplaint("");
      } else throw new Error(data.message || "Submission failed");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not submit complaint. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* About Section */}
      <section className="mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-center text-orange-500"
        >
          About MealsMate
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-green-700 text-lg leading-relaxed text-center mb-10"
        >
          <GiMeal className="inline text-2xl mr-2" />
          MealsMate is your ultimate food ordering companion! We offer a wide variety of delicious meals from Breakfast, Lunch, and Dinner categories — all in one place.  
          <br />
          <GiClockwork className="inline text-2xl mr-2 mt-2" />
          Fast, seamless, and convenient ordering — track your meals in real-time, customize your orders, and enjoy hassle-free delivery.  
          <br />
          <GiChefToque className="inline text-2xl mr-2 mt-2" />
          Your convenience, satisfaction, and taste buds are our top priority!
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: MdFastfood,
              title: "Variety of Meals",
              desc: "Discover countless meal options for Breakfast, Lunch, and Dinner.",
              color: "text-orange-500",
              bg: "bg-orange-50",
            },
            {
              icon: GiClockwork,
              title: "Fast & Seamless",
              desc: "Place your orders in seconds and track them in real-time.",
              color: "text-green-500",
              bg: "bg-green-50",
            },
            {
              icon: MdOutlineFeedback,
              title: "Feedback Friendly",
              desc: "Submit your complaints or feedback to help us improve every day.",
              color: "text-blue-500",
              bg: "bg-blue-50",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`${item.bg} p-6 rounded-xl shadow-md hover:shadow-lg transition text-center cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className={`text-4xl ${item.color} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Complaint Section */}
      <section className="bg-orange-50 p-10 rounded-xl shadow-md">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold mb-6 text-center"
        >
          Complaint / Feedback
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 font-medium mb-1">Complaint / Feedback</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Write your complaint or feedback here..."
              rows={5}
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-all"
          >
            Submit
          </motion.button>
        </form>
      </section>
    </div>
  );
}
