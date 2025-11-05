"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Check login status when the route changes (or after login redirect)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // Runs again whenever user navigates to a new page

  // ✅ Optional: Update if token changes in other tabs or during runtime
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Shop<span className="text-blue-600">Nex</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-blue-600 text-black font-bold">
            Home
          </Link>
          <Link href="/shop" className="hover:text-blue-600 text-black font-bold">
            Shop
          </Link>
          <Link href="/about" className="hover:text-blue-600 text-black font-bold">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 text-black font-bold">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
            🛒 <span className="ml-2 text-black">Cart</span>
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-2xl font-bold">✖</span>
          ) : (
            <span className="text-2xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <Link href="/" className="block text-black font-bold hover:text-blue-600">
            Home
          </Link>
          <Link href="/shop" className="block text-black font-bold hover:text-blue-600">
            Shop
          </Link>
          <Link href="/about" className="block text-black font-bold hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="block text-black font-bold hover:text-blue-600">
            Contact
          </Link>

          <div className="flex flex-col space-y-3 pt-3 border-t border-gray-200">
            <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
              🛒 <span className="ml-2 text-black">Cart</span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
