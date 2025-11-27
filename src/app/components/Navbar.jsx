"use client";

import React, { useState, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

// Firebase imports
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

import logo from '../../../public/logofinal.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);

  const { data: session } = useSession(); // NextAuth session
  const pathname = usePathname();

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Decide which user to show: session > Firebase
  const activeUser = session?.user || firebaseUser;

  // Logout function
  const handleLogout = async () => {
    if (session) {
      nextAuthSignOut(); // Google logout
    } else if (firebaseUser) {
      await firebaseSignOut(auth); // Firebase logout
      setFirebaseUser(null);
    }
  };

  return (
    <nav className="w-full mx-auto py-4 bg-white shadow-2xl">
      <div className="mx-auto w-11/12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Image src={logo} alt="logo" className="h-20 w-20 rounded-full" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex flex-row gap-10 font-bold fontext text-xl">
              <Link href="/" className={pathname === "/" ? "cliking active" : "cliking"}>Home</Link>
              <Link href="/menu" className={pathname === "/menu" ? "cliking active" : "cliking"}>Menu</Link>

              <Link href="/my-meals" className={pathname === "/my-meals" ? "cliking active" : "cliking"}>My meals</Link>

              <Link href="/review" className={pathname === "/review" ? "cliking active" : "cliking"}>Reviews</Link>
              
               <Link href="/about" className={pathname === "/about" ? "cliking active" : "cliking"}>About</Link>
               <Link href="/contact" className={pathname === "/contact" ? "cliking active" : "cliking"}>Contact</Link>

              
             
            </ul>
          </div>

          {/* User Section */}
          {activeUser ? (
            <div className="flex items-center space-x-4 bg-white shadow-md px-4 py-2 rounded-full">
              {/* Profile */}
              <div className="flex items-center space-x-3">
                {activeUser.photoURL || activeUser.image ? (
                  <img
                    src={activeUser.photoURL || activeUser.image}
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    {activeUser.displayName
                      ? activeUser.displayName[0]
                      : activeUser.name
                      ? activeUser.name[0]
                      : "U"}
                  </div>
                )}
                <p className="text-sm font-semibold text-gray-700">
                  {activeUser.displayName || activeUser.name || "User"}
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 shadow-md"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link href="/login">
                <button className="animated-button">
                  <span className="text flex justify-between items-center">
                    <p>Login</p>
                    <div className="pb-3">
                      <IoLogIn />
                    </div>
                  </span>
                  <span className="circle"></span>
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border rounded-md"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 font-medium text-lg fontext">
            <Link href="/" className={pathname === "/" ? "cliking active" : "cliking"}>Home</Link>
            <Link href="/menu" className={pathname === "/menu" ? "cliking active" : "cliking"}>Menu</Link>

           <Link href="/my-meals" className={pathname === "/my-meals" ? "cliking active" : "cliking"}>My meals</Link>

           <Link href="/review" className={pathname === "/review" ? "cliking active" : "cliking"}>Reviews</Link>
              
               <Link href="/about" className={pathname === "/about" ? "cliking active" : "cliking"}>About</Link>

               <Link href="/contact" className={pathname === "/contact" ? "cliking active" : "cliking"}>Contact</Link>

               

            

            {activeUser ? (
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 shadow-md"
              >
                Log Out
              </button>
            ) : (
              <Link href="/login">
                <button className="animated-button">
                  <span className="text flex justify-between items-center">
                    <p>Login</p>
                    <div className="pb-3">
                      <IoLogIn />
                    </div>
                  </span>
                  <span className="circle"></span>
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
