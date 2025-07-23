import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaLaptop, FaClock } from "react-icons/fa"

const JobsList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/jobs", {
          credentials: "include",
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch jobs")
        }
        
        const jobsData = await response.json()
        setJobs(jobsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Format posted date
  const formatPostedDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return "1 day ago"
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
      return `${Math.ceil(diffDays / 30)} months ago`
    } catch {
      return "Recently posted"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-blue-600">Loading jobs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Jobs</h1>
          <p className="text-lg text-gray-600">Find your dream job from our latest postings</p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-500">No jobs available at the moment</h2>
            <p className="text-gray-400 mt-2">Please check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const isRemote = job.jobType?.toLowerCase().includes('remote')
              const isPartTime = job.jobType?.toLowerCase().includes('part-time')
              
              return (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200"
                >
                  {/* Company Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center rounded-full shadow-md mr-4">
                      <span className="text-white text-lg font-bold">{job.company[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>
                      <p className="text-blue-600 font-semibold">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Type Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {job.jobType}
                    </span>
                    {isRemote && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FaLaptop className="mr-1" /> Remote
                      </span>
                    )}
                    {isPartTime && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FaClock className="mr-1" /> Part-time
                      </span>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <p className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      {job.location}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaRupeeSign className="text-green-600 mr-2" />
                      {job.salary}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaCalendarAlt className="text-purple-500 mr-2" />
                      {formatPostedDate(job.postedOn)}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills && job.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/job/${job._id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 active:scale-95">
                      View Details
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobsList