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

const PrivacyContent = () => (
  <motion.div 
    className="space-y-8 bg-white p-6 rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <section className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
      <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
      <p>
        Welcome to INTERNSWALLAH. We are committed to protecting your privacy and personal
        information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our
        services.
      </p>
    </section>

    <section className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
      <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
      <p>We collect various types of information to provide and improve our services, including:</p>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Personal information (e.g., name, email address, phone number)</li>
        <li>Professional information (e.g., resume, work history, education)</li>
        <li>Account information (e.g., username, password)</li>
        <li>Usage data (e.g., how you interact with our platform)</li>
      </ul>
    </section>

    <section className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
      <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>Providing and maintaining our services</li>
        <li>Matching you with relevant job opportunities</li>
        <li>Improving and personalizing your experience</li>
        <li>Communicating with you about our services</li>
        <li>Ensuring the security of our platform</li>
      </ul>
    </section>
  </motion.div>
);

const PasswordChangeForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0a66c2] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 badge"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Change Password
      </motion.button>
      {message && (
        <motion.div 
          className={`mt-2 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </motion.form>
  );
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4 py-8 max-w-4xl bg-white rounded-lg shadow-2xl transition-all duration-300 hover:shadow-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Privacy Policy</h1>
        <PrivacyContent />
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Change Your Password</h2>
          <PasswordChangeForm />
        </div>
      </motion.div>
    </div>
  );
}




