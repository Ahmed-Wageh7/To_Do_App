import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
  const { userData, userToken, setUserToken, setUserData } =
    useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    setUserToken(null);
    setUserData(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-emerald-600 dark:text-emerald-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500"
      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 fixed w-full z-50 top-0 start-0  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <i className="fas fa-check-double text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ToDo App
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {userData ? (
              <>
                <NavLink to="/" className={navLinkClass}>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-home text-sm"></i>
                    Home
                  </span>
                </NavLink>
                <NavLink to="/profile" className={navLinkClass}>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-user text-sm"></i>
                    Profile
                  </span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-sign-in-alt text-sm"></i>
                    Login
                  </span>
                </NavLink>
                <NavLink to="/register" className={navLinkClass}>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-user-plus text-sm"></i>
                    Register
                  </span>
                </NavLink>
              </>
            )}
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {userData && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userData.name}
                  </span>
                  <i
                    className={`fas fa-chevron-down text-xs text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  ></i>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-emerald-100/50 dark:shadow-none border border-emerald-100 dark:border-gray-700 py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userData.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userData.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-colors"
                      >
                        <i className="fas fa-user text-emerald-600 dark:text-emerald-400"></i>
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors mt-1"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <i
                className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-emerald-100 dark:border-emerald-900 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {userData ? (
              <>
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <i className="fas fa-home w-5"></i>
                  Home
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <i className="fas fa-user w-5"></i>
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                >
                  <i className="fas fa-sign-out-alt w-5"></i>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <i className="fas fa-sign-in-alt w-5"></i>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <i className="fas fa-user-plus w-5"></i>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}
