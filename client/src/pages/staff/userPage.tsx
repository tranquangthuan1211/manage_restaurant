

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEnvelope,
  faPhone,
  faLocationDot,
  faUser,
  faVenusMars,
  faCakeCandles,
  faKey,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const UserPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userData, setUserData] = useState({
    name: "ABC",
    position: "Receptionist",
    age: "25",
    gender: "Male",
    email: "abc@example.com",
    phone: "123-456-789",
    address: "123 Main St, City, Country",
    username: "johnWick123",
    password: "johnWick123",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-yellow-400 text-2xl font-semibold">
            Account Management
          </h3>
          <div className="h-1 w-60 bg-yellow-400"></div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-yellow-400 text-xl" />
          <span>{isEditing ? "Cancel Edit" : "Edit"}</span>
        </button>
      </div>

      {/* Personal Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-yellow-400 font-bold text-lg mb-4 border-b border-gray-700 pb-2">
          Personal Details
        </h4>
        <div className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faUser} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.name}</p>
              )}
            </div>
          </div>

          {/* Position */}
          <div className="bg-gray-600 p-3 rounded-md">
            <label className="block text-sm text-gray-400">Position</label>
            <p className="text-lg">{userData.position}</p>
          </div>

          {/* Age */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faCakeCandles} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Age</label>
              {isEditing ? (
                <input
                  type="text"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.age}</p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faVenusMars} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Gender</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.gender}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPhone} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="col-span-2 flex items-center space-x-3">
            <FontAwesomeIcon icon={faLocationDot} className="text-yellow-400" />
            <div className="bg-gray-600 p-3 rounded-md w-full">
              <label className="text-sm text-gray-400">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Credentials */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h4 className="text-yellow-400 font-bold text-lg mb-4 border-b border-gray-700 pb-2">
          Account Credentials
        </h4>
        <div className="grid grid-cols-2 gap-6">
          {/* Username */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faUser} className="text-yellow-400" />
            <div>
              <label className="text-sm text-gray-300">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-600 rounded-md outline-none"
                />
              ) : (
                <p className="text-lg">{userData.username}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faKey} className="text-yellow-400" />
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-600 rounded-md outline-none"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
