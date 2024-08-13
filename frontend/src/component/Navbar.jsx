import React, { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-1">
      <div className="navbar bg-base-100 h-16"> {/* Set a fixed height for the navbar */}
        {/* Left Section with Links (Hidden on Small Screens) */}
        <div className="flex-1 mx-15 hidden lg:flex items-center">
          <a className="btn btn-ghost text-lg" href="/">Home</a> {/* Reduced font size */}
          <a className="btn btn-ghost text-lg" href="/menu">Menu</a> {/* Reduced font size */}
          <a className="btn btn-ghost text-lg" href="/about">About</a> {/* Reduced font size */}
        </div>

        {/* Center Section */}
        <div className="flex-1 text-center">
          <a href="/" className="flex justify-center items-center ml-20">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] h-auto" // Reduced logo width to fit the smaller navbar height
            />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex-none hidden lg:flex items-center">
          <a className="btn btn-ghost text-lg" href="/contact">Contact</a> {/* Reduced font size */}
          <a className="btn btn-ghost text-lg" href="/login">Login</a> {/* Reduced font size */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
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
          <a className="btn btn-ghost text-lg" href="/login" onClick={() => setIsOpen(false)}>Login</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
