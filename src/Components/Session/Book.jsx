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

import { useState } from "react";
import { motion } from "framer-motion";

const TimePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isHourView, setIsHourView] = useState(true);
  const [period, setPeriod] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const handleTimeClick = (value) => {
    if (isHourView) {
      setSelectedHour(value);
      setIsHourView(false);
    } else {
      setSelectedMinute(value);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)} className="custom-timepicker">
        {formatNumber(selectedHour)}:{formatNumber(selectedMinute)} {period}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[320px] shadow-lg">
            <div className="grid gap-4">
              {/* Digital Display */}
              <div className="flex items-center justify-center gap-2 text-4xl font-light">
                <button
                  onClick={() => setIsHourView(true)}
                  className={`p-2 rounded ${isHourView ? "bg-[#0a66c2] text-white" : ""}`}
                >
                  {formatNumber(selectedHour)}
                </button>
                <span>:</span>
                <button
                  onClick={() => setIsHourView(false)}
                  className={`p-2 rounded ${!isHourView ? "bg-[#0a66c2] text-white" : ""}`}
                >
                  {formatNumber(selectedMinute)}
                </button>
                <div className="flex flex-col gap-1 ml-2 text-sm">
                  <button
                    onClick={() => setPeriod("AM")}
                    className={`px-2 py-1 rounded ${period === "AM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"}`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setPeriod("PM")}
                    className={`px-2 py-1 rounded ${period === "PM" ? "bg-[#0a66c2] text-white" : "bg-gray-100"}`}
                  >
                    PM
                  </button>
                </div>
              </div>

              {/* Clock Face */}
              <div className="relative w-64 h-64 mx-auto bg-gray-100 rounded-full border-3 border-[#0a66c2]">
                {/* Clock Numbers */}
                {(isHourView ? hours : minutes).map((number, index) => {
                  const angle = (index * 30 - 90) * (Math.PI / 180);
                  const radius = 100;
                  const x = radius * Math.cos(angle) + 128;
                  const y = radius * Math.sin(angle) + 128;

                  const isSelected = isHourView ? number === selectedHour : number === selectedMinute;

                  return (
                    <button
                      key={number}
                      onClick={() => handleTimeClick(number)}
                      className={`absolute w-10 h-10 -mt-5 -ml-5 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-[#0a66c2] text-white" : "hover:bg-gray-200"
                      }`}
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                    >
                      {formatNumber(number)}
                    </button>
                  );
                })}

                {/* Clock Hand */}
                <div
                  className="absolute w-1 bg-[#0a66c2] origin-bottom rounded-full left-1/2 -translate-x-1/2"
                  style={{
                    height: "40%",
                    top: "10%",
                    transform: `rotate(${(isHourView ? selectedHour * 30 : selectedMinute * 6) - 90}deg)`,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-[#0a66c2] hover:bg-gray-100 rounded">
                  CANCEL
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f6f6f6] relative">
      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          bookA<span className="text-[#0a66c2]">1:1</span>CounsellingSession
        </h1>
        <p className="text-gray-600 text-base md:text-xl mt-4">
          Book a session with experienced mentors across domains & work
        </p>
        <p className="text-gray-600 text-base md:text-xl mt-4">
          together to build your carrer!
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-gray-700 font-medium mb-4">Tell us about your concerns</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Input for Problems or Concerns */}
          <div>
            <label htmlFor="concerns" className="block text-sm font-medium text-gray-700">
              Want to tell about your
            </label>
            <input
              id="concerns"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2]"
              placeholder="Describe your concerns..."
            />
          </div>

          {/* Time Picker */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <label className="block text-sm font-medium text-gray-700 text-center">Choose Specific Time Slot</label>
            <div className="mt-2 flex justify-center items-center">
              <TimePicker />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white font-medium py-2 rounded-md transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK A SESSION
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

