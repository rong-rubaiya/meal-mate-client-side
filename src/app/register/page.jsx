"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import LoginGoogle from "../components/LoginGoogle";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");

    try {
      // Firebase Email/Password signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile (name + photo)
      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL || null,
      });

      console.log("Registered user:", user);

      // Role-based redirect
      if (role === "customer") router.push("/");
      else router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ee] py-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="bg-white shadow-xl rounded-2xl p-8 border-t-8 border-green-600"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl font-bold text-center mb-6 text-orange-600"
          >
            Create an Account
          </motion.h2>

          {/* Google Sign-In */}
          <LoginGoogle />

          {/* Divider */}
          <div className="flex items-center my-3">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-green-700 font-semibold mb-2">Register As:</p>
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

              <label 
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => {
    Swal.fire({
      icon: "warning",
      title: "Not Allowed",
      text: "You cannot select Chef role right now!",
    });
  }}
>
  <motion.input
    whileTap={{ scale: 0.9 }}
    type="radio"
    name="role"
    value="chef"
    checked={role === "chef"}
    onChange={() => {}} 
    disabled
    className="accent-orange-500 w-4 h-4 pointer-events-none opacity-50"
  />

  <span className="text-green-700 font-medium opacity-50">
    Chef
  </span>
</label>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Full Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-600"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-600"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Photo URL</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Enter your profile photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-orange-600"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* Register Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
            >
              Register as {role === "customer" ? "Customer" : "Chef"}
            </motion.button>
          </form>

          {/* Bottom */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 font-semibold hover:underline italic">
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
