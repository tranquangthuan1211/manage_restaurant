import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCalendarAlt,
  faFileAlt,
  faBars,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import UserPage from "./userPage";
import NotificationPage from "./notificationPage";
import CalendarPage from "./calendarPage";
import FormsPage from "./formsPage";

const StaffPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("user");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState<boolean>(false);

  const renderContent = () => {
    switch (selectedPage) {
      case "user":
        return <UserPage />;
      case "notification":
        return <NotificationPage />;
      case "calendar":
        return <CalendarPage />;
      case "forms":
        return <FormsPage />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="flex bg-gray-900 text-gray-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 p-4 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img
            src="/images/logo.png"
            alt="logo"
            className={`transition-all duration-300 ${
              isSidebarOpen ? "w-12 h-12" : "w-8 h-8"
            }`}
          />
          {isSidebarOpen && (
            <span className="text-yellow-400 font-bold text-lg ml-3">
              BABY HIPPO
            </span>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-gray-800 font-bold">
            U
          </div>
          {isSidebarOpen && (
            <div>
              <p className="font-semibold">Name</p>
              <p className="text-sm text-gray-400">Position</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <ul className="flex-1 space-y-4">
          <li
            onClick={() => setSelectedPage("user")}
            className={`cursor-pointer flex items-center space-x-3 ${
              selectedPage === "user" ? "text-yellow-400" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} />
            {isSidebarOpen && <span>User</span>}
          </li>
          <li
            onClick={() => setSelectedPage("notification")}
            className={`cursor-pointer flex items-center space-x-3 ${
              selectedPage === "notification" ? "text-yellow-400" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBell} />
            {isSidebarOpen && <span>Notification</span>}
          </li>
          <li
            onClick={() => setSelectedPage("calendar")}
            className={`cursor-pointer flex items-center space-x-3 ${
              selectedPage === "calendar" ? "text-yellow-400" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
            {isSidebarOpen && <span>Calendar</span>}
          </li>
          <li
            onClick={() => setSelectedPage("forms")}
            className={`cursor-pointer flex items-center space-x-3 ${
              selectedPage === "forms" ? "text-yellow-400" : ""
            }`}
          >
            <FontAwesomeIcon icon={faFileAlt} />
            {isSidebarOpen && <span>Forms</span>}
          </li>
          <li onClick={() =>window.location.href = "/"} className="cursor-pointer hover:text-yellow-400 flex items-center space-x-3">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-yellow-400 text-2xl focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-700 px-2 py-1 rounded-lg w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-100 px-2 w-full"
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>

          {/* Notifications and User Avatar */}
          <div className="flex items-center space-x-4 relative">
            {/* Notifications */}
            <div
              className="relative cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full px-1">
                1
              </span>
              {showNotifications && (
                <div className="absolute top-8 right-0 bg-gray-700 text-sm rounded-md p-2 shadow-lg">
                  <p>No new notifications</p>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div
              className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={() => setShowAvatarMenu(!showAvatarMenu)}
            >
              U
              {showAvatarMenu && (
                <div className="absolute top-10 right-0 bg-gray-700 text-sm rounded-md p-4 shadow-lg">
                  <p
                    className="cursor-pointer  hover:text-yellow-400"
                    onClick={() => setSelectedPage("user")}
                  >
                    User Details
                  </p>
                  <p
                    className="cursor-pointer hover:text-yellow-400 mt-2"
                    onClick={() => window.location.href = "/"}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 bg-gray-900">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StaffPage;
