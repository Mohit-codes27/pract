import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt } from "react-icons/fa"
import internshipData from "../Intern/Internship_data"

const InternshipList = () => {
  const [internships, setInternships] = useState([])

  useEffect(() => {
    setInternships(internshipData)
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Available Internships</h1>
        <p className="text-center text-gray-500 mb-8">Find your dream internship from our latest postings</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((intern, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center uppercase font-semibold">
                  {intern.company?.[0] || "C"}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{intern.title}</h2>
                  <p className="text-blue-600">{intern.company}</p>
                </div>
              </div>

              <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mb-3">
                {intern.type}
              </span>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {intern.location}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaRupeeSign className="mr-2 text-green-500" />
                {intern.stipend}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaCalendarAlt className="mr-2 text-purple-500" />
                {intern.posted}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(intern.skills) ? intern.skills : (intern.skills || "").split(",")).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>

              <Link to={`/internship/${index}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-150">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InternshipList
