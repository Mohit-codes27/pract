import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket } from "react-icons/fa";
import courses from "./Course_data";

const CourseList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <div>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl font-bold rounded-full flex items-center justify-center mr-4 shadow-md">
                  {course.company[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                  <p className="text-blue-600 font-medium text-sm">{course.company}</p>
                </div>
              </div>

              <div className="mt-2 space-y-2 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> {course.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaRegClock className="text-blue-500" /> {course.duration}
                </p>
                <p className="flex items-center gap-2">
                  <FaRupeeSign className="text-green-600" /> ₹{course.stipend}/month
                </p>
                <p className="flex items-center gap-2">
                  <FaRocket className="text-purple-600" /> {course.type}
                </p>
              </div>
            </div>

            <Link to={`/course/${index}`}>
              <button className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-full font-semibold text-sm hover:shadow-md transition-all transform hover:scale-105 active:scale-95">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
