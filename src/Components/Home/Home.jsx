import { useState } from "react";
import internshipImage from "./images/Internships.jpg";
import MentorImage from "./images/mentor.webp";
import CourseImage from "./images/courses.png"
import AbroadImage from "./images/abroad.jpeg"
import BookImage from "./images/book.webp"
import internshipsData from "./internshipsData";
import jobsData from "./jobsData";
import coursesData from "./coursesData";
import "./style.css";
import Modal from "./Modal";
import intern_bg from "./images/card_bg.webp"
import job_bg from "./images/job_bg.webp"
import course_bg from "./images/course_bg.webp"
import { Link } from "react-router-dom";

const App = () => {
  // State for managing carousel index and animation control
  const [internshipIndex, setInternshipIndex] = useState(0);
  const [jobIndex, setJobIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Animation state
  const [modal, setModal] = useState(null);

  const itemsPerPage = 4;
  const itemsPreview = 1;

  // Handlers for navigation with delay and animation
  const handleInternshipPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.max(prevIndex - itemsPreview, 0)
        );
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleInternshipNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setInternshipIndex((prevIndex) =>
          Math.min(
            prevIndex + itemsPreview,
            internshipsData.length - itemsPreview
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
        setJobIndex((prevIndex) => Math.max(prevIndex - itemsPreview, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleJobNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setJobIndex((prevIndex) =>
          Math.min(prevIndex + itemsPreview, jobsData.length - itemsPreview)
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
        setCourseIndex((prevIndex) => Math.max(prevIndex - itemsPreview, 0));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleCourseNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCourseIndex((prevIndex) =>
          Math.min(prevIndex + itemsPreview, coursesData.length - itemsPreview)
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
        <h1 className="text-4xl font-bold mb-4">InternsWallah</h1>
        <h2 className="text-2xl font-semibold mt-2 text-blue-600">
          Where Opportunity Finds Talent
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Explore opportunities from across the globe to grow, showcase skills,
          gain CV points,
        </p>
        <p className="text-lg text-gray-700">
          and get hired by your dream company.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-3 gap-5 mb-10">
        {/* Row 1 - 3 Cards */}
        <Link
        to="/internships"
        className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden">
          <img
            src={internshipImage}
            alt="Internships"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
           className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-bold">Internships</h3>
            <p className="text-lg font-bold">Gain Practical Experience</p>
          </div>
        </Link>
        <Link
        to="/mentor"
        className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden">
          <img
            src={MentorImage}
            alt="Mentorship"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-bold">Mentorships</h3>
            <p className="text-lg font-bold">Guidance From Top Mentors</p>
          </div>
        </Link>
        <Link
        to="/jobs"
        className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden">
          <img
            src="https://eduauraapublic.s3.ap-south-1.amazonaws.com/webassets/images/blogs/highest-paying-jobs-in-india.jpg"
            alt="Jobs"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-bold">Jobs</h3>
            <p className="text-lg font-bold">Explore Diverse Careers</p>
          </div>
        </Link>
        <Link
        to="/courses"
        className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden">
          <img
            src={CourseImage}
            alt="Courses"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-bold">Courses</h3>
            <p className="text-lg font-bold">Explore Fresh Courses</p>
          </div>
        </Link>

        <Link
          to="/abroad"
          className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden"
        >
          <img
            src={AbroadImage}
            alt="Abroad"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="text-lg font-bold">Study Abroad</h3>
            <p className="text-lg font-bold">Enhance Your Skills</p>
          </div>  
        </Link>
        <Link
        to="/book"
        className="p-5 flex flex-col items-center justify-center gap-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl h-48 w-80 rounded-xl overflow-hidden">
          <img
            src={BookImage}
            alt="More"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <p className="text-lg font-bold">Book a Free </p>
            <p className="text-lg font-bold">1:1 Counselling Session</p>
          </div>
        </Link>
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
                className={`relative w-full h-28 ${internship.bgColor} flex items-center justify-center `}
                style={{ backgroundImage: `url(${intern_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-2xl font-bold">
                  {internship.title}
                </h3>
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
                  <button
                    className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition"
                    onClick={() => setModal(internship)}
                  >
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
      <Modal internship={modal} onClose={() => setModal(null)} />
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
                style={{ backgroundImage: `url(${job_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-2xl font-bold">
                  {job.title}
                </h3>
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
                  <button
                    className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition"
                    onClick={() => setModal(job)}
                  >
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
      <Modal internship={modal} onClose={() => setModal(null)} />
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
                className={`relative w-full h-28 ${course.bgColor} flex items-center justify-center`}
                style={{ backgroundImage: `url(${course_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="z-10 text-white text-2xl font-bold">
                  {course.title}
                </h3>
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
                  <button
                    className="px-4 py-2 bg-[#0a66c2] badge text-white text-sm font-semibold rounded-full hover:opacity-90 transition"
                    onClick={() => setModal(course)}
                  >
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
      <Modal internship={modal} onClose={() => setModal(null)} />
    </div>
  );
};

export default App;
