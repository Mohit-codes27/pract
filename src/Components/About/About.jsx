import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InternshipFilter from "../Dropdowns/Intern/internFilter";

const About = () => {
  const [showInternships, setShowInternships] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {/* Logo and Company Name */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">Logo</div>
        <h1 className="text-lg font-semibold ml-4">Company Name</h1>
      </div>

      {/* Business Development Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Business Development</h2>
        <p className="text-gray-600">Biggest font size heading</p>
        <p className="text-gray-500">Smaller event markers, allocation details</p>
      </div>

      {/* Detailed Sections */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-bold text-gray-700">Details</h3>
        <p className="text-gray-600">Heading with bold and hot text</p>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      </div>

      {/* Job Listings Section */}
      <div className="mt-6 border-t pt-4 cursor-pointer" onClick={() => setShowInternships(true)}>
        <h3 className="text-lg font-bold text-blue-500">(25%) Job Listings</h3>
        <p className="text-gray-600">Consisting of offers and job cards</p>
        <div className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-100">
          <p className="text-gray-700">Live Job Design</p>
        </div>
      </div>

      {/* Internship Filter Section */}
      {showInternships && <InternshipFilter />}
    </div>
  );
};

export default About;
