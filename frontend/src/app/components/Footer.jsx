"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Shop<span className="text-blue-500">Nex</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Premium furniture and lifestyle products designed for comfort and
            elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-blue-500 transition-colors">Shop</Link></li>
            <li><Link href="/about" className="hover:text-blue-500 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/returns" className="hover:text-blue-500 transition-colors">Returns</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Subscribe to get exclusive deals and updates!
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} <span className="text-white font-medium">ShopNex</span>. All rights reserved.
      </div>
    </footer>
  );
}
