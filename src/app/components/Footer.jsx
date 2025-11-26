"use client";

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900  text-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          {/* Logo / Brand */}
          <div>
            <h1 className="text-2xl font-bold text-orange-400">Meal-Mate</h1>
            <p className="mt-2 text-gray-400 text-sm">
              Your Daily Meal Assistant. Delivering fresh meals to your hostel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-400 transition">Home</a>
              </li>
              <li>
                <a href="/menu" className="hover:text-orange-400 transition">Menu</a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-400 transition">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-400 transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-orange-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-orange-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-orange-400 transition"><FaInstagram /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-400 text-sm">Hostel Canteen, Dhanmondi, Dhaka</p>
            <p className="text-gray-400 text-sm mt-1">Email: support@meal-mate.com</p>
            <p className="text-gray-400 text-sm mt-1">Phone: +880 1234 567890</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Meal-Mate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
