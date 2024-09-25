"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButtonAdmin = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after sign out
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
        />
      </svg>
      <span className="mx-4 font-medium">Logout</span>
    </button>
  );
};

export default LogoutButtonAdmin;
