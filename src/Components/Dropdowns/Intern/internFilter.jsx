import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import internships from "./Internship_data" // Import internship data

const InternshipFilter = () => {
  // State for filters
  const [filters, setFilters] = useState({
    usePreferences: false,
    profile: "",
    location: "",
    includeWfh: false,
    partTime: false,
    minStipend: 0,
  })

  // State for filtered internships
  const [filteredInternships, setFilteredInternships] = useState(internships)

  // State for showing more filters
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  // State for stipend display value
  const [stipendDisplay, setStipendDisplay] = useState("₹0")

  // Apply filters whenever filters state changes
  useEffect(() => {
    const results = internships.filter((internship) => {
      // Filter by profile
      if (filters.profile && !internship.title.toLowerCase().includes(filters.profile.toLowerCase())) {
        return false
      }

      // Filter by location
      if (filters.location && !internship.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Filter by work from home
      if (filters.includeWfh && !internship.isRemote) {
        return false
      }

      // Filter by part-time
      if (filters.partTime && !internship.isPartTime) {
        return false
      }

      // Filter by minimum stipend
      if (internship.stipendValue < filters.minStipend) {
        return false
      }

      return true
    })

    setFilteredInternships(results)
  }, [filters])

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Handle stipend slider change
  const handleStipendChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setFilters((prev) => ({
      ...prev,
      minStipend: value,
    }))
    setStipendDisplay(`₹${value.toLocaleString()}`)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      usePreferences: false,
      profile: "",
      location: "",
      includeWfh: false,
      partTime: false,
      minStipend: 0,
    })
    setStipendDisplay("₹0")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Internship</h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Section */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-[#0a66c2]">Filters</h2>
                <button onClick={clearFilters} className="text-sm text-[#0a66c2] hover:underline">
                  Clear All
                </button>
              </div>

              <div className="space-y-5">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="usePreferences"
                    checked={filters.usePreferences}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-[#0a66c2] rounded focus:ring-[#0a66c2]"
                  />
                  <span>As per my preferences</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile</label>
                  <input
                    type="text"
                    name="profile"
                    value={filters.profile}
                    onChange={handleFilterChange}
                    placeholder="e.g. Marketing"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="e.g. Delhi"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                  />
                </div>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="includeWfh"
                    checked={filters.includeWfh}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-[#0a66c2] rounded focus:ring-[#0a66c2]"
                  />
                  <span>Include work from home</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="partTime"
                    checked={filters.partTime}
                    onChange={handleFilterChange}
                    className="w-4 h-4 text-[#0a66c2] rounded focus:ring-[#0a66c2]"
                  />
                  <span>Part-time</span>
                </label>

                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum monthly stipend</label>
                    <span className="text-sm font-medium">{stipendDisplay}</span>
                  </div>
                  <input
                    type="range"
                    name="minStipend"
                    min="0"
                    max="20000"
                    step="1000"
                    value={filters.minStipend}
                    onChange={handleStipendChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0a66c2]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹0</span>
                    <span>₹20,000</span>
                  </div>
                </div>

                {showMoreFilters && (
                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <select
                        name="duration"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                        onChange={handleFilterChange}
                      >
                        <option value="">Any duration</option>
                        <option value="1-3">1-3 months</option>
                        <option value="3-6">3-6 months</option>
                        <option value="6+">6+ months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start date</label>
                      <select
                        name="startDate"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                        onChange={handleFilterChange}
                      >
                        <option value="">Any time</option>
                        <option value="immediate">Immediately</option>
                        <option value="1month">Within 1 month</option>
                        <option value="3months">Within 3 months</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className="text-sm text-[#0a66c2] hover:underline"
                >
                  {showMoreFilters ? "Show fewer filters" : "View more filters"}
                </button>
              </div>
            </div>
          </div>

          {/* Internships Section */}
          <div className="col-span-12 md:col-span-9 space-y-4">
            {filteredInternships.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No internships found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{filteredInternships.length} internships found</p>
                  <select className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2]">
                    <option>Sort by: Relevance</option>
                    <option>Sort by: Latest</option>
                    <option>Sort by: Highest stipend</option>
                  </select>
                </div>

                {filteredInternships.map((internship, index) => (
                  <Link key={index} to={`/internship/${index}`} className="block">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">{internship.title}</h3>
                            {internship.isRemote && (
                              <span className="bg-blue-50 text-[#0a66c2] text-xs px-2 py-1 rounded-full">Remote</span>
                            )}
                            {internship.isPartTime && (
                              <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
                                Part-time
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{internship.company}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {internship.location}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {internship.duration}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              ₹{internship.stipend}
                            </span>
                          </div>
                          <p className="text-xs text-[#0a66c2]">{internship.posted} ago</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-end">
                          <button className="bg-[#0a66c2] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#084e96] transition-colors">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternshipFilter
