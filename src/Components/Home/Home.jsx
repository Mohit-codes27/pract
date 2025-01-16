import React, { useState } from "react";
import internshipImage from "./internship.jpg";
import internshipsData from "./internshipsData";
import jobsData from "./jobsData";
import coursesData from "./coursesData";
import "./style.css";

const App = () => {
  // State for managing carousel index and animation control
  const [internshipIndex, setInternshipIndex] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  const itemsPerPage = 4;

  // Handlers for navigation with delay and animation
  const handleInternshipPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.max(prevIndex - itemsPerPage, 0)
        );
        setIsAnimating(false); // End animation after state update
      }, 300); // Delay for animation (300ms)
    }
  };

  const handleInternshipNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.min(
            prevIndex + itemsPerPage,
            internshipsData.length - itemsPerPage
          )
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handlers for navigation (Jobs)
  const handleJobPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setJobIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleJobNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setJobIndex((prevIndex) =>
          Math.min(prevIndex + itemsPerPage, jobsData.length - itemsPerPage)
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Handlers for navigation (Courses)
  const handleCoursePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCourseIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCourseNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCourseIndex((prevIndex) =>
          Math.min(prevIndex + itemsPerPage, coursesData.length - itemsPerPage)
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get the visible items
  const visibleInternships = internshipsData.slice(
    internshipIndex,
    internshipIndex + itemsPerPage
  );
  const visibleJobs = jobsData.slice(jobIndex, jobIndex + itemsPerPage);
  const visibleCourses = coursesData.slice(
    courseIndex,
    courseIndex + itemsPerPage
  );


  return (
    <div className="flex flex-col items-center p-5">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">InternsWallah</h1>
        <h2 className="text-2xl font-semibold mt-2">
          Your Gateway to Dream Internships!
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Explore opportunities from across the globe to grow, showcase skills,
          gain CV points, and get hired by your dream company.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-5 mb-10">
        {/* Row 1 - 3 Cards */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img src={internshipImage} alt="Internships" className="w-20 h-20" />
          <div className="text-center">
            <h3 className="text-lg font-bold">Internships</h3>
            <p>Gain Practical Experience</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img
            src="/path-to-your-image/mentorships.png"
            alt="Mentorships"
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="text-lg font-bold">Mentorships</h3>
            <p>Guidance From Top Mentors</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img
            src="/path-to-your-image/jobs.png"
            alt="Jobs"
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="text-lg font-bold">Jobs</h3>
            <p>Explore Diverse Careers</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-200 to-yellow-300 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img
            src="/path-to-your-image/jobs.png"
            alt="Courses"
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="text-lg font-bold">Courses</h3>
            <p>Explore Fresh Courses</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-300 to-red-200 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img
            src="/path-to-your-image/jobs.png"
            alt="Skills"
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="text-lg font-bold">Skills</h3>
            <p>Enhance Your Skills</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-rose-300 to-pink-200 p-5 rounded-lg flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-36 w-72">
          <img
            src="/path-to-your-image/jobs.png"
            alt="More"
            className="w-16 h-16"
          />
          <div className="text-center">
            <p>Book a Free </p>
            <p>1:1 Counselling Session</p>
          </div>
        </div>
      </div>

      {/* Latest Internships Section */}
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl font-bold mb-5">Fresh Internships</h2>
        <div className="grid grid-cols-4 gap-5">
          {visibleInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              {/* Top Section with Gradient and Icon */}
              <div
                className={`relative w-full h-28 ${internship.bgColor} flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-2xl font-bold">{internship.title}</h3>
              </div>

              {/* Main Content */}
              <div className="p-5">
                {/* Organization Name */}
                <p className="text-gray-700 text-lg font-medium mb-3">
                  {internship.organization}
                </p>

                {/* Metadata Section */}
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">📍</span>
                    <p>{internship.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🕒</span>
                    <p>{internship.duration}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">💰</span>
                    <p>{internship.stipend}</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center mt-5">
                  <div className="text-gray-500 text-sm flex gap-3">
                    <span>👁️ {internship.views} Views</span>
                    <span>⏳ {internship.daysLeft} Days Left</span>
                  </div>
                  <button className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleInternshipPrev}
            disabled={internshipIndex === 0}
          >
            &larr;
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleInternshipNext}
            disabled={internshipIndex + itemsPerPage >= internshipsData.length}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl font-bold mb-5">Fresh Jobs</h2>
        <div className="grid grid-cols-4 gap-5">
          {visibleJobs.map((job) => (
            <div
            key={job.id}
            className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Top Section with Gradient and Icon */}
            <div
              className={`relative w-full h-28 ${job.bgColor} flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <h3 className="z-10 text-white text-2xl font-bold">{job.title}</h3>
            </div>

            {/* Main Content */}
            <div className="p-5">
              {/* Organization Name */}
              <p className="text-gray-700 text-lg font-medium mb-3">
                {job.organization}
              </p>

              {/* Metadata Section */}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">📍</span>
                  <p>{job.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🕒</span>
                  <p>{job.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">💰</span>
                  <p>{job.stipend}</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center mt-5">
                <div className="text-gray-500 text-sm flex gap-3">
                  <span>👁️ {job.views} Views</span>
                  <span>⏳ {job.daysLeft} Days Left</span>
                </div>
                <button className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleJobPrev}
            disabled={jobIndex === 0}
          >
            &larr;
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleJobNext}
            disabled={jobIndex + itemsPerPage >= jobsData.length}
          >
            &rarr;
          </button>
        </div>
      </div>
      {/* Latest Courses Section */}
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl font-bold mb-5">Kickstart</h2>
        <div className="grid grid-cols-4 gap-5">
          {visibleCourses.map((course) => (
            <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg border transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            {/* Top Section with Gradient and Icon */}
            <div
              className={`relative w-full h-28 bg-gradient-to-r ${course.bgColor} flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <h3 className="z-10 text-white text-2xl font-bold">{course.title}</h3>
            </div>

            {/* Main Content */}
            <div className="p-5">
              {/* Organization Name */}
              <p className="text-gray-700 text-lg font-medium mb-3">
                {course.organization}
              </p>

              {/* Metadata Section */}
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">📍</span>
                  <p>{course.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🕒</span>
                  <p>{course.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">💰</span>
                  <p>{course.stipend}</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center mt-5">
                <div className="text-gray-500 text-sm flex gap-3">
                  <span>👁️ {course.views} Views</span>
                  <span>⏳ {course.daysLeft} Days Left</span>
                </div>
                <button className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-s-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleCoursePrev}
            disabled={courseIndex === 0}
          >
            &larr;
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-e-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-xl"
            onClick={handleCourseNext}
            disabled={courseIndex + itemsPerPage >= coursesData.length}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
