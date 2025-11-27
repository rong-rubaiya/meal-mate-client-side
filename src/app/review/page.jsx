"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const BACKEND_URL = "https://y-one-rose.vercel.app";

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5.0); // decimal default
  const [loading, setLoading] = useState(true);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setFirebaseUser(user));
    return () => unsubscribe();
  }, []);

  const activeUser = session?.user || firebaseUser;
  const userEmail = activeUser?.email;
  const userImage =
    activeUser?.photoURL || activeUser?.image || "https://randomuser.me/api/portraits/lego/1.jpg";

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) return Swal.fire("Error!", "You must be logged in.", "error");

    const reviewData = {
      email: userEmail,
      image: userImage,
      review: newReview,
      rating: parseFloat(newRating.toFixed(1)), // decimal
    };

    try {
      const res = await fetch(`${BACKEND_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]);
        setNewReview("");
        setNewRating(5.0);
        Swal.fire("Success!", "Review submitted.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to submit review.", "error");
    }
  };

  // Delete review (only own)
  const handleDelete = async (review) => {
    if (review.email !== userEmail) return Swal.fire("Error!", "You can only delete your own review.", "error");

    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${BACKEND_URL}/reviews/${review._id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter((r) => r._id !== review._id));
        Swal.fire("Deleted!", "Your review has been removed.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete review.", "error");
    }
  };

  // Update review (only own)
  const handleUpdate = async (review) => {
    if (review.email !== userEmail) return Swal.fire("Error!", "You can only update your own review.", "error");

    const { value: formValues } = await Swal.fire({
      title: "Update Review",
      html:
        `<textarea id="reviewText" class="swal2-textarea" placeholder="Review">${review.review}</textarea>` +
        `<input id="reviewRating" type="number" step="0.1" min="0" max="5" class="swal2-input mt-2" value="${review.rating}" />`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          review: document.getElementById("reviewText").value,
          rating: parseFloat(document.getElementById("reviewRating").value),
        };
      },
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!formValues) return;

    try {
      const res = await fetch(`${BACKEND_URL}/reviews/${review._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        setReviews(
          reviews.map((r) => (r._id === review._id ? { ...r, ...formValues } : r))
        );
        Swal.fire("Updated!", "Your review has been updated.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update review.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (!activeUser) return <ProtectedRoute><p>Please login to view reviews.</p></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">All Reviews</h1>

        {/* Submit Review */}
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow">
          <textarea
            rows={3}
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full border rounded p-2 mb-2 focus:outline-green-400"
          />
          <div className="flex items-center mb-2">
            <span className="mr-2">Rating:</span>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={newRating}
              onChange={(e) => setNewRating(parseFloat(e.target.value))}
              className="border rounded p-1 focus:outline-green-400 w-20"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded "
          >
            Submit Review
          </button>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-400 hover:scale-105 transition-transform"
            >
              <div className="sm:flex items-center mb-4">
                <img
                  src={review.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-green-400"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{review.email}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => {
                      const starValue = i + 1;
                      if (review.rating >= starValue) {
                        return <FaStar key={i} className="text-yellow-400" />;
                      } else if (review.rating >= starValue - 0.5) {
                        return <FaStarHalfAlt key={i} className="text-yellow-400" />;
                      } else {
                        return <FaRegStar key={i} className="text-gray-300" />;
                      }
                    })}
                    <span className="ml-2 text-sm text-gray-500">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                {/* Buttons only for owner */}
                {review.email === userEmail && (
                  <div className="flex flex-col gap-1 ml-4">
                    <button
                      onClick={() => handleUpdate(review)}
                      className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-900"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(review)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-700">{review.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
