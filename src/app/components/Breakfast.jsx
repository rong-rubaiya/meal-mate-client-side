"use client";


import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Breakfast() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/breakmeals")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }, []);


 const handleSort = (e) => {
  const text = e.target.value;

  if (text === "low") {
    fetch("http://localhost:5000/breakmeals/sort/low-high")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.log(err));
  }

  if (text === "high") {
    fetch("http://localhost:5000/breakmeals/sort/high-low")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }

  if (text === "all") {
    fetch("http://localhost:5000/breakmeals")
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error(err));
  }
};

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Breakfast Meals</h2>

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

          {/* card */}

      <div className="flex flex-col gap-10">
        {meals.map((meal) => (
          <div key={meal._id} className="relative mx-auto w-full max-w-md bg-green-900 rounded-t-full shadow-xl hover:bg-green-950 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden">
            <div className="relative w-full h-52">
              <div className="absolute inset-0 rounded-b-[50%] overflow-hidden shadow-inner">
                <img src={meal.image || "#"} // fallback image
  alt={meal.name || "Meal image"} className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-gray-50 font-bold mb-2">{meal.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{meal.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-orange-600 font-bold text-xl text-white">৳{meal.price}</span>
                <span className="text-yellow-500 font-semibold">⭐ {meal.reviews}</span>
              </div>
              <p className="text-gray-300 text-xs mb-4">Posted by: {meal.posted_by}</p>
              <Link href={`singbreak/${meal._id}`}>
                <button className="w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
