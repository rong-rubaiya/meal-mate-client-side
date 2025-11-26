"use client";

import Banner from "./components/Banner";
import Coocker from "./components/Coocker";
import Features from "./components/Features";
import Hotedished from "./components/Hotedished";

import Reviews from "./components/Reviews";



export default function Hero() {
  return (
   <div className="space-y-5">
    <Banner></Banner>
    <Hotedished/>
    <Features/>
    <Coocker/>
    <Reviews/>
   </div>
  );
}
