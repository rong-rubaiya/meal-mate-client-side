"use client"; // must be on top
import React from 'react';
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"; // ✅ import signIn

export default function LoginGoogle() {

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" }); // ✅ Google sign-in, redirect to home after login
  };

  return (
    <motion.button
      onClick={handleGoogleSignIn} // ✅ click handler added
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="w-full flex items-center justify-center gap-2 bg-white border-2 border-orange-500 p-3 rounded-lg font-semibold text-orange-700 shadow-sm hover:bg-orange-50 transition mb-5 cursor-pointer"
      type="button"
    >
      <FcGoogle className="text-2xl" />
      Continue with Google
    </motion.button>
  );
}
