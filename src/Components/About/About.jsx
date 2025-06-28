import { useEffect, useState } from "react"
import axios from "axios"

const About = () => {
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        })
        setUserType(res.data.role)
      } catch (error) {
        console.log("Not logged in or failed to fetch role", error)
        setUserType("guest")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Internswallah</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Internswallah, we connect students with the right opportunities and help companies discover passionate,
            skilled interns ready to grow and make an impact.
          </p>
        </div>

        {/* Employee Section */}
        {userType === "employee" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">For Students</h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-6">
                Starting your career can be overwhelming, but Internswallah is here to make it simple and rewarding. We
                provide students with access to verified internships, industry insights, and career-building resources
                to help them stand out in the job market. Whether you're looking to gain hands-on experience, strengthen
                your resume, or find the right career path, Internswallah is your trusted partner in success.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Students Choose Internswallah?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Access to verified internships across multiple industries.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Skill-building resources to improve employability.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Career guidance, resume building, and interview preparation.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>A growing network of mentors, industry professionals, and
                  recruiters.
                </li>
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-900">
                  Join Internswallah and take the first step towards a successful future!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Employer Section */}
        {userType === "employer" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">For Employers</h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-6">
                Finding the right talent for your organization can be a challenge, but Internswallah makes it seamless.
                We connect businesses with driven, skilled interns who are ready to contribute and grow. Whether you're
                a startup or a well-established company, we streamline the hiring process, saving you time and effort
                while ensuring access to top student talent.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Businesses Choose Internswallah?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Hassle-free access to skilled and motivated interns.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Reduced recruitment time and effort.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>A pool of industry-ready students eager to learn and
                  contribute.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Flexibility to find interns based on specific business needs.
                </li>
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="font-medium text-gray-900">
                  Partner with Internswallah today and discover the next generation of professionals who can help drive
                  your business forward!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Guest Section */}
        {userType === "guest" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to Internswallah</h2>
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <p className="text-gray-700 leading-relaxed">
                Internswallah is a bridge between opportunity seekers and providers. Whether you're a student or a
                recruiter, join us to make meaningful connections and unlock new possibilities.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default About
