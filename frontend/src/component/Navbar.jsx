import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TO-ME.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect that the user is logged out
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="py-1">
      <div className="navbar bg-base-100 h-16">
        {/* Left Section with Links (Hidden on Small Screens) */}
        <div className="flex-1 mx-15 hidden lg:flex items-center">
          <a className="btn btn-ghost hover:text-[#da9858] text-lg" href="/">Home</a>
          <a className="btn btn-ghost hover:text-[#da9858] text-lg" href="/menu">Menu</a>
          <a className="btn btn-ghost hover:text-[#da9858] text-lg" href="/about">About</a>
        </div>

        {/* Center Section */}
        <div className="flex-1 text-center">
          <a href="/" className="flex justify-center items-center ml-10">
            <img
              src={logo}
              alt="Logo"
              className="w-[190px] h-auto"
            />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex-none hidden lg:flex items-center">
          <a className="btn btn-ghost hover:text-[#da9858] text-lg" href="/contact">Contact</a>
          {isLoggedIn ? (
            <button
              className="btn btn-ghost hover:text-[#da9858] text-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <a className="btn btn-ghost hover:text-[#da9858] text-lg" href="/login">Login</a>
          )}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <a href="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden flex-none">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isOpen && (
        <div className="lg:hidden mt-2 flex flex-col space-y-2">
          <a className="btn btn-ghost text-lg" href="/" onClick={() => setIsOpen(false)}>Home</a>
          <a className="btn btn-ghost text-lg" href="/menu" onClick={() => setIsOpen(false)}>Menu</a>
          <a className="btn btn-ghost text-lg" href="/about" onClick={() => setIsOpen(false)}>About</a>
          <a className="btn btn-ghost text-lg" href="/contact" onClick={() => setIsOpen(false)}>Contact</a>
          {isLoggedIn ? (
            <button
              className="btn btn-ghost text-lg"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <a
              className="btn btn-ghost text-lg"
              href="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
