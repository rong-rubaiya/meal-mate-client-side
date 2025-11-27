"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function OrderButton({ meal, category }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const { data: session, status } = useSession(); // NextAuth session & status

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Decide which user to use: NextAuth session first, then Firebase
  const activeUser = session?.user || firebaseUser;
  const userEmail = session?.user?.email || firebaseUser?.email;

  const handleOrder = async () => {
    if (!activeUser) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to place an order.",
        icon: "warning",
        confirmButtonColor: "#FF7A00",
      });
      return;
    }

    const orderData = {
      mealId: meal._id,
      mealName: meal.name,
      price: meal.price,
      category: category || "unknown",
      userEmail,
      orderTime: new Date(),
      status: "pending",
    };

    try {
      const res = await fetch("https://y-one-rose.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Order Successful!",
          text: `${meal.name} has been added to your orders.`,
          icon: "success",
          confirmButtonColor: "#FF7A00",
        });
      } else {
        throw new Error(data.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not place order. Please try again.",
        icon: "error",
        confirmButtonColor: "#FF7A00",
      });
    }
  };

  if (status === "loading") return <button disabled>Loading...</button>;

  return (
    <button
      onClick={handleOrder}
      className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl 
                 text-lg font-semibold shadow-md hover:shadow-lg 
                 hover:scale-[1.03] active:scale-95 transition-all duration-200"
    >
      Order Now 🍽️
    </button>
  );
}
