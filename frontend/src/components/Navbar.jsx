import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLoginPopup }) => {
  const [menu, setMenu] = useState("Home");

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white opacity-90 shadow-lg m-4 rounded-2xl fixed top-0 z-50 w-screen">
      <img src={assets.logo} alt="Logo" className="h-20 w-20" />

      {/* Navigation Links */}
      <ul className="flex gap-6 text-gray-700 font-medium">
        <Link to="/">
          <li
            onClick={() => setMenu("Home")}
            className={`cursor-pointer transition-all duration-200 ${
              menu === "Home"
                ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }`}
          >
            Home
          </li>
        </Link>

        <li
          onClick={() => {
            document.getElementById("menu")?.scrollIntoView({
              behavior: "smooth",
            });
            setMenu("Menu");
          }}
          className={`cursor-pointer transition-all duration-200 ${
            menu === "Menu"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "hover:text-orange-500"
          }`}
        >
          Menu
        </li>

        <li
          onClick={() => {
            document.getElementById("mobile-app")?.scrollIntoView({
              behavior: "smooth",
            });
            setMenu("Mobile App");
          }}
          className={`cursor-pointer transition-all duration-200 ${
            menu === "Mobile App"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "hover:text-orange-500"
          }`}
        >
          Mobile App
        </li>

        <li
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
            });
            setMenu("Contact Us");
          }}
          className={`cursor-pointer transition-all duration-200 ${
            menu === "Contact Us"
              ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1"
              : "hover:text-orange-500"
          }`}
        >
          Contact Us
        </li>
      </ul>

      {/* Icons and Button */}
      <div className="flex items-center gap-4">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-5 cursor-pointer"
        />
        <Link to="/cart">
          <img
            src={assets.basket_icon}
            alt="Basket"
            className="w-5 cursor-pointer"
          />
        </Link>
        <button
          onClick={() => setShowLoginPopup(true)}
          className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
