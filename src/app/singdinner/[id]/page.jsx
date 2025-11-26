"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Swal from "sweetalert2";
import Orderbuton from "@/app/components/Orderbuton";

export default function SingleBreakfastPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/dinnermeals/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Full API response:", data);
        setMeal(data.result); // Only meal data
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!meal) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <ProtectedRoute>
      <SingleMealDetails meal={meal} />
    </ProtectedRoute>
  );
}

function SingleMealDetails({ meal }) {
   const handleOrder = () => {
      Swal.fire({
        title: "Order Successful!",
        text: `${meal.name} has been added to your order.`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF7A00",
      });
    };
  return (
     <div className="max-w-3xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-gray-700 rounded-lg shadow"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>

      <img
       src={meal.image || "#"} // fallback image
  alt={meal.name || "Meal image"} 
        className="w-full h-80 object-cover rounded-lg mb-4"
      />

      <p className="text-gray-700 mb-2">{meal.description}</p>
      <p className="font-semibold text-lg">Price: ৳{meal.price}</p>
      <p className="text-gray-500 mt-2">Posted by: {meal.posted_by}</p>
      <p className="text-yellow-500 mt-2">⭐ {meal.reviews}</p>

      {/* ORDER Button */}
      <Orderbuton meal={meal} category="Dinner" ></Orderbuton>
    </div>
  );
}
