import React from "react";
import { Link } from "react-router-dom";
import courses from "./Course_data"; // Import Course data

const CourseFilter = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Filters Section */}
        <div className="col-span-3 bg-white p-4 rounded-2xl shadow">
          <p className="text-xl text-[#0a66c2] flex items-center mb-4">Filters</p>
          <div>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              As per my preferences
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Profile</label>
              <input
                type="text"
                placeholder="e.g. Marketing"
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                className="w-full border-gray-900 rounded-md p-2"
              />
            </div>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              Include work from home also
            </label>
            <label className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              Part-time
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Desired minimum monthly stipend (₹)
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="1000"
                className="w-full"
              />
            </div>
            <button className="text-sm underline text-[#0a66c2]">
              View more filters
            </button>
            <button className="text-sm text-[#0a66c2] ml-28">
              Clear All
            </button>
          </div>
        </div>

        {/* courses Section */}
        <div className="col-span-9 space-y-4">
          {courses.map((course, index) => (
            <Link key={index} to={`/Course/${index}`}>
            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:cursor-pointer hover:shadow-lg hover:scale-105 transition transform duration-300">
              <div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.company}</p>
                <p className="text-sm">
                  {course.location} • {course.duration} • ₹
                  {course.stipend}/month
                </p>
                <p className="text-xs text-blue-500 mt-1">{course.posted} ago</p>
              </div>
              <div>
                <button className="bg-[#0a66c2] text-white px-4 py-2 rounded-md text-sm mt-12 badge">
                    Apply Now
                  </button>
              </div>
            </div>
          </Link>
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
