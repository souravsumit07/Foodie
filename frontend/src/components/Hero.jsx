import React from "react";
import { assets } from "../assets/assets";
import AOS from "aos"

const Hero = () => {
  return (
    <div className="relative w-full mt-40">
      
      <img
        src={assets.header_img}
        alt="Hero"
        className="w-full object-cover"
      />

      
      <div className="absolute bottom-24 left-10 text-white" data-aos="fade-right">
        <h1 className="text-4xl font-bold mb-3">
          Delicious Food, Delivered Fast 🍔
        </h1>
        <p className="text-lg mb-4 max-w-md" >
          Order your favorite meals from our wide range of dishes — fresh, tasty,
          and ready in minutes!
        </p>
        <button className="bg-orange-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-orange-600 transition">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Hero;
