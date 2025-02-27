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
import React from 'react';
import "./abroad.css"
const AbroadPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center -mt-8 bg-[url('/src/Components/Abroad/bgImg.jpg')] bg-cover bg-center m-0">
      {/* Header Section */}
      <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          findYour<span className="text-[#0a66c2]">DreamCollege</span>AbroadForMBA&Masters
        </h1>
        <p className="text-gray-600 text-base md:text-xl mt-4">
          Choose from over 4,000 colleges, get free personalized counseling,
        </p>
        <p className="text-gray-600 mt-2 text-base md:text-xl">
          and secure up to 100% scholarships!
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <p className="text-gray-700 font-medium mb-4">I'm looking for</p>
        <form className="space-y-4">
          {/* Specialization Dropdown */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Select specialization
            </label>
            <select
              id="specialization"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select specialization</option>
              <option>Business Administration</option>
              <option>Engineering</option>
              <option>Healthcare</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Country Dropdown */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Select country
            </label>
            <select
              id="country"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Select country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0a66c2] hover:bg-blue-600 text-white font-medium py-2 rounded-md transition badge"
          >
            Find colleges
          </button>
        </form>
      </div>
    </div>
  );
};

export default AbroadPage;
