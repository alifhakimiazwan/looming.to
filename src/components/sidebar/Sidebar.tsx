"use client";
import Link from "next/link";
import React, { useState } from "react";
import LogoutButtonAdmin from "../buttons/LogoutButtonAdmin";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faBars,
  faTimes,
  faCog,
  faChartLine,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ user, page }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Manage mobile sidebar state

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="rounded-full p-1 bg-secondary shadow-lg lg:hidden">
        <button
          className="lg:hidden flex items-center px-4 py-3 text-gray-700 hover:opacity-50 focus:outline-none z-20"
          onClick={toggleSidebar} // Toggle mobile menu
        >
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="w-6 h-6 text-white"
          />
        </button>
      </div>

      {/* Overlay for dark background when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar} // Clicking the overlay will close the sidebar
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 px-4 py-8 bg-white border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:transform-none h-screen`}
      >
        {/* Logo */}
        <a href="/" className="btn btn-ghost text-3xl text-secondary">
          Looming
        </a>

        {/* User Info */}
        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={user.image}
            alt="avatar"
          />
          {page && (
            <Link
              target="_blank"
              href={page.uri}
              className="flex items-center mx-2 mt-4"
            >
              <FontAwesomeIcon icon={faLink} className="text-secondary" />
              <span className="ml-1">{page.uri}</span>
            </Link>
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="menu flex flex-col flex-1 mt-7">
          <nav>
            <Link
              href="/account"
              className={`button flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-gray-800 ${
                pathname === "/account"
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <Link
              href="/analytics"
              className={`button flex items-center px-4 py-2 mt-5 rounded-lg hover:bg-gray-200 hover:text-gray-800 ${
                pathname === "/analytics"
                  ? "bg-gray-100 text-primary"
                  : "text-gray-600"
              }`}
            >
              <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
              <span className="mx-4 font-medium">Analytics</span>
            </Link>

            <Link
              href="/settings"
              className={`button flex items-center px-4 py-2 mt-5 rounded-lg hover:bg-gray-200 hover:text-gray-800 ${
                pathname === "/settings"
                  ? "bg-gray-100 text-primary"
                  : "text-gray-600"
              }`}
            >
              <FontAwesomeIcon icon={faCog} className="w-5 h-5" />
              <span className="mx-4 font-medium">Settings</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto">
            <LogoutButtonAdmin />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
