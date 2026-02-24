import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageFail, setMessageFail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUserToken, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain uppercase, lowercase, number and special character",
        },
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (userData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://todo-nti.vercel.app/user/login",
        userData,
      );

      setMessageFail("");
      setMessageSuccess("Welcome back! Redirecting...");

      setTimeout(() => {
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        setUserToken(res.data.token);
        setUserData(res.data.user);
        navigate("/");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setMessageSuccess("");
      setMessageFail("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Success Toast */}
      {messageSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-emerald-500 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px]">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Success!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {messageSuccess}
              </p>
            </div>
            <button
              onClick={() => setMessageSuccess("")}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {messageFail && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px]">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation text-red-600 dark:text-red-400"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Error
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {messageFail}
              </p>
            </div>
            <button
              onClick={() => setMessageFail("")}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with green gradient */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30 shadow-lg">
              <i className="fas fa-sign-in-alt text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-emerald-100 text-sm">
              Sign in to continue your journey
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded flex items-center justify-center">
                  <i className="fas fa-envelope text-xs text-emerald-600 dark:text-emerald-400"></i>
                </div>
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-4 pr-4 py-3.5 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none ${
                    errors.email
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600 group-hover:border-emerald-300"
                  }`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-pulse">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded flex items-center justify-center">
                  <i className="fas fa-lock text-xs text-emerald-600 dark:text-emerald-400"></i>
                </div>
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-4 pr-12 py-3.5 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 dark:border-gray-600 group-hover:border-emerald-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs flex items-center gap-1.5 mt-1 animate-pulse">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6 group"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin text-lg"></i>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 text-sm">
                or
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group"
              >
                Create account
                <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

// bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50
