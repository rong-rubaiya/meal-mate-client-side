"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LoginGoogle from "../components/LoginGoogle";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user);

      // Redirect based on role
      if (role === "customer") router.push("/");
      else router.push("/");
    } catch (err) {
      setError(err.message);
    }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ee] py-6">
      {/* Background fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md"
      >
        {/* Card Slide Up Animation */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="bg-white shadow-xl rounded-2xl p-8 border-t-8 border-orange-500"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-3xl font-bold text-center mb-6 text-green-700"
          >
            Meal-Mate Login
          </motion.h2>

          {/* Google Login */}
          <LoginGoogle />

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-green-700 font-semibold mb-2">Login As:</p>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <motion.input
                  whileTap={{ scale: 0.9 }}
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-orange-500 w-4 h-4"
                />
                <span className="text-green-700 font-medium">Customer</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <motion.input
                  whileTap={{ scale: 0.9 }}
                  type="radio"
                  name="role"
                  value="chef"
                  checked={role === "chef"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-orange-500 w-4 h-4"
                />
                <span className="text-green-700 font-medium">Chef</span>
              </label>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* Login Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold transition"
            >
              Login as {role === "customer" ? "Customer" : "Chef"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don’t have an account?{" "}
            <Link href="/register">
              <span className="text-orange-600 font-semibold hover:underline italic">
                Register
              </span>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
