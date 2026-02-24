import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!userData) {
    return (
      <div className="min-h-screen  dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-3xl text-gray-400"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please login to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.patch(
        "https://todo-nti.vercel.app/user/update",
        { name, email },
        { headers: { token: localStorage.getItem("userToken") } },
      );
      setUserData(res.data.user);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      setMessage("Profile updated successfully!");
      setMessageType("success");
    } catch {
      setMessage("Failed to update profile.");
      setMessageType("error");
    } finally {
      setIsUpdating(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen  dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-emerald-100/50 dark:shadow-none border border-emerald-100/50 dark:border-gray-700 overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 relative"></div>

          {/* Avatar & Info */}
          <div className="px-8 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-4">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-3xl font-bold text-emerald-600 shadow-lg border-4 border-white dark:border-gray-800">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-emerald-100/50 dark:shadow-none border border-emerald-100/50 dark:border-gray-700 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
              <i className="fas fa-user-edit text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Profile
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal information
              </p>
            </div>
          </div>

          {/* Alert Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                messageType === "success"
                  ? "bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
                  : "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  messageType === "success"
                    ? "bg-emerald-100 dark:bg-emerald-800"
                    : "bg-red-100 dark:bg-red-800"
                }`}
              >
                <i
                  className={`fas ${messageType === "success" ? "fa-check text-emerald-600" : "fa-exclamation text-red-600"}`}
                ></i>
              </div>
              <p
                className={`text-sm font-medium ${
                  messageType === "success"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-user"></i>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-0 focus:border-emerald-500 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setName(userData.name);
                  setEmail(userData.email);
                  setMessage("");
                }}
                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-undo"></i>
                Reset
              </button>
              <button
                type="submit"
                disabled={
                  isUpdating ||
                  (name === userData.name && email === userData.email)
                }
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Account Info */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fas fa-shield-alt text-emerald-600"></i>
              Account Security
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400 text-sm"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Verified
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-11">
                  Your email is confirmed
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <i className="fas fa-key text-blue-600 dark:text-blue-400 text-sm"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-11">
                  Last changed recently
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
