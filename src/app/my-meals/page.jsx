"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export default function MyMealsPage() {
  const { data: session } = useSession();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  const activeUser = session?.user || firebaseUser;
  const userEmail = activeUser?.email;

  // Fetch user orders
  useEffect(() => {
    if (!userEmail) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/orders?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userEmail]);

  // Delete order
  const handleDelete = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
          setOrders(orders.filter((order) => order._id !== orderId));
        } else {
          throw new Error(data.message || "Failed to delete order");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete order.", "error");
      }
    }
  };

  // Update order (quantity or notes)
  const handleUpdateOrder = (order) => {
    Swal.fire({
      title: "Update Order",
      html: `
        <input type="number" id="quantity" class="swal2-input" placeholder="Quantity" value="${order.quantity || 1}" min="1" />
        <input type="text" id="notes" class="swal2-input" placeholder="Your note" value="${order.notes || 'Your note'}" />
      `,
      confirmButtonText: "Update",
      focusConfirm: false,
      preConfirm: () => {
        const quantity = parseInt(Swal.getPopup().querySelector("#quantity").value);
        const notes = Swal.getPopup().querySelector("#notes").value || "Your note";

        if (isNaN(quantity) || quantity < 1) {
          Swal.showValidationMessage("Quantity must be at least 1");
          return false;
        }

        return { quantity, notes };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/orders/${order._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.value),
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Updated!", "Your order has been updated.", "success");
            setOrders(
              orders.map(o => o._id === order._id ? { ...o, ...result.value } : o)
            );
          } else {
            throw new Error(data.message || "Failed to update order");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Could not update order.", "error");
        }
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;

  if (!activeUser)
    return <ProtectedRoute><MyMealsPage/></ProtectedRoute>;

  // Group orders by category
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.category]) acc[order.category] = [];
    acc[order.category].push(order);
    return acc;
  }, {});

  const totalAmount = orders.reduce(
    (acc, order) => acc + order.price * (order.quantity || 1),
    0
  );

  return (
    
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : (
          <>
            {Object.keys(groupedOrders).map((category) => (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {groupedOrders[category].map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-2xl transition "
                    >
                      {/* Order Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{order.mealName}</h3>
                        <p className="text-gray-600">Price: <span className="font-bold">৳</span> {order.price}</p>
                        <p className="text-gray-600">Quantity: {order.quantity || 1}</p>
                        <p className="text-gray-600">Notes: {order.notes || "Your note"}</p>
                        <p className="text-gray-600">Status: {order.status}</p>
                        <p className="text-gray-800 font-bold mt-2">
                          Total: <span className="text-green-600">৳ {order.price * (order.quantity || 1)}</span>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                          onClick={() => handleUpdateOrder(order)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total Amount */}
            <div className="mt-8 p-6 bg-orange-100 rounded-xl text-right text-xl font-bold">
              Total Amount: <span className="text-green-600">৳ {totalAmount}</span>
            </div>
          </>
        )}
      </div>
    
  );
}
