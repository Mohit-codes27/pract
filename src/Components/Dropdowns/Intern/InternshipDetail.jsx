import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import internships from "./Internship_data";
import {
  FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket, FaCalendarAlt, FaLaptop, FaClock
} from "react-icons/fa";

const InternshipDetail = () => {
  const { id } = useParams();
  const internshipId = Number.parseInt(id || "0");
  const internship = internships[internshipId];

  // Retrieve applied internships from localStorage
  // const [appliedInternships, setAppliedInternships] = useState(() => {
  //   return JSON.parse(localStorage.getItem("appliedInternships")) || {};
  // });
  const [appliedInternships, setAppliedInternships] = useState(false);

  // Check if this specific internship has been applied
  const isApplied = appliedInternships;

  // Function to apply for the internship
  const applyForInternship = () => {
    // setAppliedInternships(true)
    const updatedAppliedInternships = { ...appliedInternships, [id]: true };
    setAppliedInternships(updatedAppliedInternships);
    localStorage.setItem(
      "appliedInternships",
      JSON.stringify(updatedAppliedInternships)
    );
  };

  if (!internship) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-red-500">
        Internship not found
      </div>
    );
  }
  const getInternshipType = () => {
    if (internship.isRemote && internship.isPartTime)
      return "Remote, Part-time";
    if (internship.isRemote) return "Remote";
    if (internship.isPartTime) return "Part-time";
    return "Full-time";
  };
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-50 to-gray-100 p-8 gap-8">
      {/* Left Section - Internship Details */}
      <div className="flex flex-col w-3/4 p-8 bg-white shadow-2xl rounded-2xl transform transition-all h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Company Info */}
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-6">
            <span className="text-white text-2xl font-bold">
              {internship.company[0]}
            </span>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800">
              {internship.title}
            </h2>
            <p className="text-blue-600 text-2xl font-semibold mt-2">
              {internship.company}
            </p>
          </div>
        </div>

        {/* Internship Details */}
        <div className="grid grid-cols-2 gap-8 text-gray-900 text-lg border-t pt-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />{" "}
              <span className="font-bold">Location:</span> {internship.location}
            </p>
            <p className="flex items-center gap-3">
              <FaRegClock className="text-blue-500 text-xl" />{" "}
              <span className="font-bold">Duration:</span> {internship.duration}
            </p>
            <p className="flex items-center gap-3">
              <FaCalendarAlt className="text-purple-500 text-xl" />{" "}
              <span className="font-bold">Posted:</span> {internship.posted} ago
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3">
              <FaRupeeSign className="text-green-600 text-xl" />{" "}
              <span className="font-bold">Stipend:</span> ₹{internship.stipend}
              /month
            </p>
            <p className="flex items-center gap-3">
              <FaRocket className="text-purple-600 text-xl" />{" "}
              <span className="font-bold">Internship Type:</span>{" "}
              {getInternshipType()}
            </p>
            {internship.isRemote && (
              <p className="flex items-center gap-3">
                <FaLaptop className="text-teal-600 text-xl" />{" "}
                <span className="bg-blue-50 text-[#0a66c2] px-2 py-1 rounded-full text-sm">
                  Remote Work Available
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Skills Section - Added from the new data */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-3xl font-bold mb-6">Skills Required</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {internship.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Description - Added from the new data */}
        <div className="mt-4 text-gray-800">
          <h3 className="text-3xl font-bold mb-6">Description</h3>
          <p className="text-lg">{internship.description}</p>
        </div>

        {/* Additional Details */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-3xl font-bold mb-6">Eligibility & Details</h3>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Flexible working hours</li>
            <li>Certificate upon completion</li>
            <li>Opportunities for full-time employment</li>
            <li>Work on real-world projects</li>
            {internship.isRemote && <li>Remote work available</li>}
            {internship.isPartTime && <li>Part-time option available</li>}
          </ul>
        </div>

        {/* Apply Now Button or Success Message */}
        <div className="mt-auto pt-3">
          {isApplied ? (
            <p className="text-center text-green-600 text-xl font-bold">
              You have successfully applied! 🎉
            </p>
          ) : (
            <Link to="https://forms.gle/2vaCeRxNQjDnsoi69">
              <button
                onClick={applyForInternship}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-full text-xl font-extrabold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                Apply Now
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Right Section - Other Internships */}
      <div className="w-1/4 bg-white shadow-2xl rounded-2xl p-6 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">
          Other Internship Offers
        </h3>
        {internships.slice(0, 6).map((otherInternship, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-6 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {otherInternship.title}
            </h4>
            <p className="text-sm text-gray-600 mb-1">
              {otherInternship.company}
            </p>
            <p className="text-xs flex items-center gap-2 text-gray-500 mb-1">
              <FaMapMarkerAlt className="text-red-500" />{" "}
              {otherInternship.location}
            </p>
            <p className="text-sm font-medium mb-4">
              <FaRupeeSign className="inline text-green-600" />{" "}
              {otherInternship.stipend} / month
            </p>
            <Link to={`/internship/${index}`} className="w-full">
              <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipDetail;
