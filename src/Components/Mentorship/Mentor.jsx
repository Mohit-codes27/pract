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

const MentorPage = () => {
  const [time, setTime] = useState({ hour: "", minute: "", period: "" });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center -mt-8 bg-[#f6f6f6]">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Get personalized <span className="text-[#0a66c2]">1 : 1</span> Mentorship form industry experts!
        </h1>
        <p className="text-gray-600 text-base md:text-xl mt-4">
        Connect with experienced mentors who will guide you through your 
        </p>
        <p className="text-gray-600 mt-2 text-base md:text-xl">
        career, skill development, and industry challenges.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="text-gray-700 font-medium mb-4">Want to tell about your</p>
        <form className="space-y-4">
          {/* Input for Problems or Concerns */}
          <div>
            <label
              htmlFor="concerns"
              className="block text-sm font-medium text-gray-700"
            >
              Mentorship Needs
            </label>
            <input
              id="concerns"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your need..."
            />
          </div>
          
          {/* Time Slot Selection */}
          <div>
            <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">
              Choose Specific Time Slot
            </label>
            <div className="flex space-x-2 mt-1">
              <select
                id="hour"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={time.hour}
                onChange={(e) => setTime({ ...time, hour: e.target.value })}
              >
                <option value="">HH</option>
                {[...Array(12).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
              
              <select
                id="minute"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={time.minute}
                onChange={(e) => setTime({ ...time, minute: e.target.value })}
              >
                <option value="">MM</option>
                {[...Array(60).keys()].map((num) => (
                  <option key={num} value={num}>{num.toString().padStart(2, "0")}</option>
                ))}
              </select>
              
              <select
                id="period"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={time.period}
                onChange={(e) => setTime({ ...time, period: e.target.value })}
              >
                <option value="">AM/PM</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0a66c2] hover:bg-blue-600 text-white font-medium py-2 rounded-md transition badge"
          >
            BOOK A SESSION
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorPage;
