import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import bgImage from "../../../public/banner.jpg"; 


export default function Banner() {
  return (
     <div className="relative w-full px-2 sm:px-0 h-96">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Background"
        fill
        className="object-cover"
      />

      {/* Overlay (optional for better text readability) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Heading */}
      <motion.div
        className="absolute flex flex-col justify-center items-center text-5xl md:text-6xl font-bold w-full text-center py-20 text-[#F7F2E2]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>Welcome to Meal-Mate</h1>
        <p className='font-bold text-xl my-4 fontext'>Your Daily Meal Assistant</p>


        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
    
        
          className="mt-8 p-2 sm:p-5 text-2xl bg-orange-400  text-white font-semibold    w-auto sm:w-xl rounded-4xl shadow-2xl hover:shadow-2xl transition-all"
        >
          Click Here <br className='sm:hidden' />to Know More
        </motion.button>
      </motion.div>

     
    </div>
  )
}
