// components/sidebar/Sidebar.js
import React from "react";
import Link from "next/link";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`w-60 h-[calc(100vh-64px)] fixed top-16 left-0 p-5 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="space-y-4">
        <li>
          <Link href="/about">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900">
              About
            </div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900">
              About
            </div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900">
              About
            </div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div className="text-lg font-medium text-gray-700 hover:text-gray-900">
              About
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
