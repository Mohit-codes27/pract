// import React from 'react'

// export default function About() {
//   return (
//       <div className="py-16 bg-[#eff7fc]">
//           <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
//               <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
//                   <div className="md:5/12 lg:w-5/12">
//                       <img
//                           src="https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?cs=srgb&dl=pexels-canvastudio-3153201.jpg&fm=jpg"
//                           alt="image"
//                       />
//                   </div>
//                   <div className="md:7/12 lg:w-6/12">
//                       <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
//                           React development is carried out by passionate developers
//                       </h2>
//                       <p className="mt-6 text-gray-600">
//                           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
//                           accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
//                           aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
//                       </p>
//                       <p className="mt-4 text-gray-600">
//                           Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
//                           Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
//                       </p>
//                   </div>
//               </div>
//           </div>
//       </div>
//   );
// }


import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { Link } from "react-router-dom";

export default function Setting() {
  const [accountType, setAccountType] = useState("Jobseeker");
  const [email, setEmail] = useState("aadityaaggarwal475@gmail.com");
  const [phone, setPhone] = useState("96256 81776");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleEmailChange = () => {
    setShowEmailInput(!showEmailInput);
    if (showEmailInput) showNotification("Email updated successfully.");
  };

  const handlePhoneChange = () => {
    setShowPhoneInput(!showPhoneInput);
    if (showPhoneInput) showNotification("Phone number updated successfully.");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-10 border rounded-lg shadow-lg bg-white mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Account Settings
      </h2>

      {notification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 mb-4 text-center text-white bg-green-500 rounded"
        >
          {notification}
        </motion.div>
      )}

      <div className="mb-6">
        <p className="font-medium">Account type:</p>
        <select
          className="border p-2 rounded w-full mt-2 cursor-pointer transition hover:bg-gray-100"
          value={accountType}
          onChange={handleAccountTypeChange}
        >
          <option>Employee</option>
          <option>Employer</option>
        </select>
      </div>

      <div className="mb-6">
        <p className="font-medium">Email:</p>
        {showEmailInput ? (
          <input
            type="email"
            className="border p-2 rounded w-full mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="mt-2">{email}</p>
        )}
        <button
          onClick={handleEmailChange}
          className="text-blue-600 mt-2 hover:underline transition hover:text-blue-800"
        >
          {showEmailInput ? "Save Email" : "Change Email"}
        </button>
      </div>

      <div className="mb-6">
        <p className="font-medium">Phone number:</p>
        {showPhoneInput ? (
          <div className="flex items-center mt-2">
            <span className="mr-2 font-medium">+91</span>
            <input
              type="tel"
              className="border p-2 rounded w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        ) : (
          <p className="mt-2">+91 {phone}</p>
        )}
        <button
          onClick={handlePhoneChange}
          className="text-blue-600 mt-2 hover:underline transition hover:text-blue-800"
        >
          {showPhoneInput ? "Save Phone Number" : "Change Phone Number"}
        </button>
      </div>

      <div className="mb-6">
        <p className="font-medium">Notification Preferences:</p>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          Enable Email Notifications
        </label>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={smsEnabled}
            onChange={() => setSmsEnabled(!smsEnabled)}
          />
          Enable SMS Notifications
        </label>
      </div>

      <Link
        to=""
        onClick={logoutHandler}
        className="text-[#eff7fc] bg-[#0a66c2] hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center px-4 lg:px-5 py-2 lg:py-2.5 w-full focus:outline-none block mx-auto badge"
      >
        Sign out
      </Link>
    </motion.div>
  );
}
