"use client";


import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function Lunch() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("https://y-one-rose.vercel.app/lunchmeals")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }, []);


 const handleSort = (e) => {
  const text = e.target.value;

  if (text === "low") {
    fetch("https://y-one-rose.vercel.app/lunchmeals/sort/low-high")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.log(err));
  }

  if (text === "high") {
    fetch("https://y-one-rose.vercel.app/lunchmeals/sort/high-low")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }

  if (text === "all") {
    fetch("https://y-one-rose.vercel.app/lunchmeals")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }
};


  return (
     <div className="">
      <h2 className="text-3xl sm:text-5xl font-bold fontext mt-20 mb-8 text-center">Lunch Meals</h2>

      {/* sort */}


      <div className="flex justify-center items-center gap-2 my-6">
            <label className="text-sm sm:text-xl text-black dark:text-[#EC6325] font-bold">
              Sort by:
            </label>
            <select 

            onChange={handleSort}
            
            name='sort'
            
            className="px-3  py-2 rounded-xl border-2 border-[#EC6325] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EC6325]">
              <option value="all">All properties</option>
              <option value="low">Price (Low → High)</option>
              <option value="high">Price (High → Low)</option>
            </select>
          </div>


       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="relative mx-auto w-full max-w-md bg-orange-300 rounded-2xl sm:rounded-t-full  shadow-xl hover:shadow-2xl hover:bg-orange-400 cursor-pointer transition-all duration-300 border border-gray-200 overflow-hidden"
          >

           
            <div className="relative w-full h-42 sm:h-70">
              <div className="absolute inset-0 rounded-b-[50%] overflow-hidden shadow-inner">
                <img
                 src={meal.image || "/#"} // fallback image
  alt={meal.name || "Meal image"} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{meal.name}</h3>

              <p className="text-gray-600 text-sm mb-4">
                {meal.description}
              </p>

              {/* Price + Rating */}
              <div className="flex justify-between items-center mb-4">
                <span className=" font-bold text-xl">
                  ৳{meal.price}
                </span>
                <span className=" font-semibold flex gap-1">
                  <FaStar /> <div className=''>
                    {meal.reviews}
                  </div>
                </span>
              </div>

              <p className=" text-xs mb-4">
                Posted by: {meal.posted_by}
              </p>

              {/* Place Order Button */}
               <Link href={`singlunch/${meal._id}`}>
              <button className="
                w-full bg-green-800 
                text-white py-3 rounded-xl text-lg font-semibold 
                shadow-md hover:shadow-lg hover:scale-[1.03] 
                active:scale-95 transition-all duration-200 cursor-pointer
              ">
                View Details
              </button>
              </Link>
            </div>

            {/* Bottom curved decoration */}
            <div className="absolute bottom-0 left-0 w-full h-6 "></div>
          </div>
        ))}
      </div>
    </div>
  )
}
