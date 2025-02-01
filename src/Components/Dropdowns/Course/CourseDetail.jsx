import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import courses from "./Course_data";
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRocket } from "react-icons/fa";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses[id];

  if (!course) {
    return <div className="flex items-center justify-center h-screen text-2xl text-red-500">Courses not found</div>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-50 to-gray-100 p-8 gap-8">
      {/* Left Section - course Details */}
      <div className="flex flex-col w-3/4 p-8 bg-white shadow-2xl rounded-2xl transform transition-all h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Company Info */}
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-lg mr-6">
            <span className="text-white text-2xl font-bold">{course.company[0]}</span>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800">{course.title}</h2>
            <p className="text-blue-600 text-2xl font-semibold mt-2">{course.company}</p>
          </div>
        </div>

        {/* course Details */}
        <div className="grid grid-cols-2 gap-8 text-gray-900 text-lg border-t pt-6">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-red-500 text-xl" /> <span className="font-bold">Location:</span> {course.location}</p>
            <p className="flex items-center gap-3"><FaRegClock className="text-blue-500 text-xl" /> <span className="font-bold">Duration:</span> {course.duration}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3"><FaRupeeSign className="text-green-600 text-xl" /> <span className="font-bold">Stipend:</span> ₹{course.stipend}/month</p>
            <p className="flex items-center gap-3"><FaRocket className="text-purple-600 text-xl" /> <span className="font-bold">Internship Type:</span> {course.type}</p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 text-gray-800">
          <h3 className="text-3xl font-bold mb-6">Eligibility & Details</h3>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Flexible working hours</li>
            <li>Certificate upon completion</li>
            <li>Opportunities for full-time employment</li>
            <li>Work on real-world projects</li>
          </ul>
        </div>

        {/* Apply Now Button */}
        <div className="mt-auto pt-3">
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-full text-xl font-extrabold shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95">
            Apply Now
          </button>
        </div>
      </div>

      {/* Right Section - Other courses */}
      <div className="w-1/4 bg-white shadow-2xl rounded-2xl p-6 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Other course Offers</h3>
        {courses.slice(0, 6).map((course, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-6 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{course.company}</p>
            <p className="text-xs flex items-center gap-2 text-gray-500 mb-1">
              <FaMapMarkerAlt className="text-red-500" /> {course.location}
            </p>
            <p className="text-sm font-medium mb-4"><FaRupeeSign className="inline text-green-600" /> {course.stipend} / month</p>
            <Link to={`/course/${index}`} className="w-full">
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

export default CourseDetail;