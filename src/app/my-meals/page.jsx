"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [loading, setLoading] = useState(true);

  // Listen Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      
    });
    return () => unsubscribe();
  }, []);

  const activeUser = session?.user || firebaseUser;
  const userEmail = activeUser?.email;
  const userImage = activeUser?.image || "https://randomuser.me/api/portraits/lego/1.jpg";

  console.log(activeUser)

  // Fetch reviews
  useEffect(() => {
    fetch("https://y-one-rose.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      Swal.fire("Error!", "You must be logged in to submit a review.", "error");
      return;
    }

    if (!newReview || !newRating) return;

    const reviewData = {
      email: userEmail,
      image: userImage,
      review: newReview,
      rating: newRating,
    };

    try {
      const res = await fetch("https://y-one-rose.vercel.app/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]); // show instantly
        setNewReview("");
        setNewRating(5);
        Swal.fire("Success!", "Your review has been submitted.", "success");
      } else {
        Swal.fire("Error!", "Failed to submit review.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;

  if (!activeUser) return <ProtectedRoute><p>Please login to view reviews.</p></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">All Reviews</h1>

        {/* Input */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow">
          <textarea
            className="w-full border rounded p-2 mb-2 focus:outline-green-400"
            rows={3}
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <div className="flex items-center mb-2">
            <span className="mr-2">Rating:</span>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="border rounded p-1 focus:outline-green-400"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded"
          >
            Submit Review
          </button>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-400 hover:scale-105 transition-transform"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-green-400"
                />
                <div>
                  <p className="font-semibold text-lg">{review.email}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < Math.round(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-md">{review.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
