import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-emerald-100 dark:border-emerald-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <i className="fas fa-check-double text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ToDo App
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-home text-xs"></i>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-user text-xs"></i>
                Profile
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-shield-alt text-xs"></i>
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-envelope text-xs"></i>
                Contact
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p className="flex items-center gap-2">
            <i className="far fa-copyright"></i>
            {currentYear} ToDo App. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Made with
            <i className="fas fa-heart text-red-500 animate-pulse"></i>
            using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
