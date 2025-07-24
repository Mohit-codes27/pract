import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Landmark,
  Building2,
  Brain,
  Briefcase,
  Home,
  FileText,
  PencilLine,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  Trash2,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [postedJobs, setPostedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });
        setProfile(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Fetch jobs posted by this user
  useEffect(() => {
    async function fetchMyJobs() {
      try {
        setJobsLoading(true);
        const res = await axios.get("http://localhost:5000/my-jobs", {
          withCredentials: true,
        });
        setPostedJobs(res.data);
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        setPostedJobs([]);
      } finally {
        setJobsLoading(false);
      }
    }
    
    // Only fetch jobs if profile is loaded and user is authenticated
    if (profile) {
      fetchMyJobs();
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/profile", formData, {
        withCredentials: true,
      });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Calculate days ago
  const getDaysAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return `${Math.ceil(diffDays / 30)} months ago`;
    } catch {
      return "Recently";
    }
  };

  // Delete job handler
  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`http://localhost:5000/jobs/${jobId}`, {
          withCredentials: true,
        });
        // Remove the deleted job from state
        setPostedJobs(postedJobs.filter(job => job._id !== jobId));
        alert("Job deleted successfully!");
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-700">
          Loading, please wait...
        </h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="mt-4 text-lg font-medium text-gray-700">
          No profile data found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row gap-6 p-6">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 text-center space-y-6">
        {/* Avatar + Basic Info */}
        <div>
          <img
            src={
              profile.avatar ||
              "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt="Avatar"
            className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg"
          />
          <h2 className="text-3xl font-bold mt-4">{profile.fullName}</h2>
          <p className="text-gray-500 text-lg">
            @{profile.username || "username"}
          </p>
          <p className="text-gray-700 font-semibold text-lg">
            {profile.companyType || "Your Organization"}
          </p>
        </div>

        {/* About Section */}
        <div className="text-left">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            <PencilLine className="inline mr-2" size={20} />
            About
          </h3>
          {editing ? (
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full border rounded-md p-2 text-gray-700"
            />
          ) : (
            <p className="text-gray-600 text-md">
              {profile.about || "Tell us about yourself."}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="w-2/3 space-y-6">
        {/* Profile Details Section */}
        <div className="bg-white shadow-xl rounded-xl p-6 w-[100%]">
          <div className="flex items-center justify-between mb-6 w-full">
            <h3 className="text-3xl font-bold">Profile Details</h3>
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-2 rounded-full"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-2 rounded-full"
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              onSubmit={handleSave}
            >
              {[
                {
                  label: "Full Name",
                  name: "fullName",
                  type: "text",
                  icon: <User className="inline mr-2" size={18} />,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  icon: <Mail className="inline mr-2" size={18} />,
                },
                {
                  label: "Phone",
                  name: "phone",
                  type: "text",
                  icon: <Phone className="inline mr-2" size={18} />,
                },
                {
                  label: "City",
                  name: "city",
                  type: "text",
                  icon: <Landmark className="inline mr-2" size={18} />,
                },
                {
                  label: "Company Type",
                  name: "companyType",
                  type: "text",
                  icon: <Building2 className="inline mr-2" size={18} />,
                },
                {
                  label: "Work Field",
                  name: "workField",
                  type: "text",
                  icon: <Brain className="inline mr-2" size={18} />,
                },
                {
                  label: "Role",
                  name: "role",
                  type: "text",
                  icon: <Briefcase className="inline mr-2" size={18} />,
                },
                {
                  label: "Address",
                  name: "address",
                  type: "text",
                  icon: <Home className="inline mr-2" size={18} />,
                },
              ].map(({ label, name, type, icon }) => (
                <div key={name}>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {icon}
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData?.[name] || ""}
                    onChange={handleChange}
                    disabled={name === "email"}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-2 rounded-full"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
              <p>
                <User className="inline mr-2" size={18} />
                <b>Full Name:</b> {profile.fullName || "Not provided"}
              </p>
              <p>
                <Mail className="inline mr-2" size={18} />
                <b>Email:</b> {profile.email}
              </p>
              <p>
                <Phone className="inline mr-2" size={18} />
                <b>Phone:</b> {profile.phone || "Not provided"}
              </p>
              <p>
                <Landmark className="inline mr-2" size={18} />
                <b>City:</b> {profile.city || "Not specified"}
              </p>
              <p>
                <Building2 className="inline mr-2" size={18} />
                <b>Company Type:</b> {profile.companyType || "Not specified"}
              </p>
              <p>
                <Brain className="inline mr-2" size={18} />
                <b>Work Field:</b> {profile.workField || "Not specified"}
              </p>
              <p>
                <Briefcase className="inline mr-2" size={18} />
                <b>Role:</b> {profile.role || "Not specified"}
              </p>
              <p>
                <Home className="inline mr-2" size={18} />
                <b>Address:</b> {profile.address || "Not specified"}
              </p>
            </div>
          )}
        </div>

        {/* Posted Jobs Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold flex items-center">
              <FileText className="inline mr-2" size={22} />
              My Posted Jobs
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">
                Total Jobs: {postedJobs.length}
              </span>
              <Link 
                to="/job-post"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Post New Job
              </Link>
            </div>
          </div>

          <p className="text-gray-600 text-md mb-4">
            Manage all the job postings you have created.
          </p>

          {jobsLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : postedJobs.length > 0 ? (
            <div className="space-y-4">
              {postedJobs.map((job) => (
                <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        {job.jobTitle}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link 
                        to={`/job/${job._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="View Job"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="mr-2" size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2" size={16} />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2" size={16} />
                      {formatDate(job.postedOn)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {job.jobType}
                      </span>
                      <span className="text-xs text-gray-500">
                        Posted {getDaysAgo(job.postedOn)}
                      </span>
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex items-center gap-1">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                You have not posted any jobs yet.
              </p>
              <Link 
                to="/job-post"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}