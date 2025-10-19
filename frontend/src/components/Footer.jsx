import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / About */}
        <div>
          <img src={assets.logo} alt="Foodie Logo" className="w-24 mb-3" />
          <p className="text-sm leading-relaxed">
            Foodie brings you the best meals from your favorite restaurants —
            hot, fresh, and delivered fast! Order now and satisfy your cravings 🍕
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-orange-500 cursor-pointer">Home</li>
            <li className="hover:text-orange-500 cursor-pointer">Menu</li>
            <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <p>Email: support@foodie.com</p>
          <p>Phone: +91 98765 43210</p>

          <div className="flex gap-4 mt-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-6 cursor-pointer hover:opacity-80" />
            <img src={assets.linkedin_icon} alt="Instagram" className="w-6 cursor-pointer hover:opacity-80" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-6 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Foodie. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
