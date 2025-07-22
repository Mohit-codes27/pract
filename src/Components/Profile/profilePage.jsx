import { useEffect, useState } from "react";
import axios from "axios";
// import achievementData from "./achievementsData";
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
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dummyApplications, setApplications] = useState(true);
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
  useEffect(() => {
    const dummyApplications = [
      {
        title: "Frontend Developer Internship",
        type: "Internship",
        location: "Remote",
        createdAt: "2025-07-01T10:22:00Z",
      },
      {
        title: "Backend Engineer",
        type: "Job",
        location: "Mumbai",
        createdAt: "2025-06-20T15:00:00Z",
      },
      {
        title: "UI/UX Designer Internship",
        type: "Internship",
        location: "Delhi",
        createdAt: "2025-07-05T09:00:00Z",
      },
    ];

    setApplications(dummyApplications);
  }, []);

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
                  name: "name",
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

        {/* Resume Upload (You can connect with Cloudinary here later) */}
        {/* <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="inline mr-2" size={22} />
            Resume Upload
          </h3>
          <p className="text-gray-600 text-md mb-3">
            Upload your resume to apply faster!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept="application/pdf"
              id="resumeUpload"
              className="border p-2 rounded w-full"
              disabled
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
              disabled
            >
              Upload (Coming Soon)
            </button>
          </div>
        </div> */}
        {/* Open Applications Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold flex items-center">
              <FileText className="inline mr-2" size={22} />
              Open Applications
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              Uploaded: {dummyApplications.length}
            </span>
          </div>

          <p className="text-gray-600 text-md mb-3">
            Here are all the applications you've posted.
          </p>

          {dummyApplications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {dummyApplications.map((app, index) => (
                <li key={index} className="py-3">
                  <h4 className="text-lg font-semibold">{app.title}</h4>
                  <p className="text-sm text-gray-600">
                    {app.type} • {app.location} • Posted on{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              You have not posted any applications yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
