import { useEffect, useState } from "react";
import axios from "axios";
import achievementData from "./achievementsData";
import { User, Mail, Phone, Landmark, Venus, Languages, UserCheck, FileText, PencilLine, Trophy, CheckCircle, XCircle } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function ProfilePage2() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axios.get("http://localhost:5000/employee-profile", {
          withCredentials: true,
        });
        console.log("Profile data fetched:", res.data);
        
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:5000/employee-profile", formData, {
        withCredentials: true,
      });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleResumeUpload = async () => {
    if (!file) return;
    setResumeUploading(true);
    setResumeMessage("");
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/employee-profile/upload-resume",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/pdf" },
        }
      );
      setResumeMessage("Resume uploaded successfully!");
      // Update profile with new resume URL
      setProfile((prev) => ({ ...prev, resume: res.data.resumeUrl }));
      setFile(null);
    } catch (error) {
      setResumeMessage("Error uploading resume.");
      console.error("Error uploading resume:", error);
    } finally {
      setResumeUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    setResumeUploading(true);
    setResumeMessage("");
    try {
      await axios.delete("http://localhost:5000/employee-profile/delete-resume", {
        withCredentials: true,
      });
      setResumeMessage("Resume deleted.");
      setProfile((prev) => ({ ...prev, resume: "" }));
      setFile(null);
    } catch (error) {
      setResumeMessage("Error deleting resume.");
      console.error("Error deleting resume:", error);
    } finally {
      setResumeUploading(false);
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
          <p className="text-gray-500 text-lg">@{profile.username || "username"}</p>
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
            <p className="text-gray-600 text-md">{profile.about || "Tell us about yourself."}</p>
          )}
        </div>

        {/* Achievements Section */}
        <div className="text-left w-full">
  <h3 className="text-xl font-bold mb-4 flex items-center">
            <Trophy className="inline mr-2" size={20} />
            Achievements
          </h3>
  <div className="space-y-4">
    {Object.entries(achievementData).map(([key, { label, value, total, color, isPercentage, isCheck }]) => {
      const percent = isPercentage
        ? value
        : Math.min((value / total) * 100, 100);
      return (
        <div key={key}>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 text-md font-medium">{label}</span>
            <span className="text-gray-600 text-sm">
                        {isCheck ? (
                          value === total ? (
                            <CheckCircle className="inline text-green-500" size={18} />
                          ) : (
                            <XCircle className="inline text-red-500" size={18} />
                          )
                        ) : isPercentage ? (
                          `${percent}%`
                        ) : (
                          `${value} / ${total}`
                        )}
                      </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`bg-${color}-500 h-3 rounded-full`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
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
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {[
    ["Full Name", "fullName", "text", <User className="inline mr-2" size={18} />],
    ["Email", "email", "email", <Mail className="inline mr-2" size={18} />],
    ["Phone", "phone", "text", <Phone className="inline mr-2" size={18} />],
    ["City", "city", "text", <Landmark className="inline mr-2" size={18} />],
    ["Gender", "gender", "text", <Venus className="inline mr-2" size={18} />],
    ["Languages", "languages", "text", <Languages className="inline mr-2" size={18} />],
    ["Type", "type", "text", <UserCheck className="inline mr-2" size={18} />]
  ].map(([label, name, type, icon]) => (
    <div key={name}>
      <label className="block font-semibold text-gray-700 mb-1">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        disabled={name === "email"}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  ))}
</form>

    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
        <p><User className="inline mr-2" size={18} /><b>Full Name:</b> {profile.fullName || "Not provided"}</p>
        <p><Mail className="inline mr-2" size={18} /><b>Email:</b> {profile.email}</p>
        <p><Phone className="inline mr-2" size={18} /><b>Phone:</b> {profile.phone || "Not provided"}</p>
        <p><Landmark className="inline mr-2" size={18} /><b>City:</b> {profile.city || "Not specified"}</p>
        <p><Venus className="inline mr-2" size={18} /><b>Gender:</b> {profile.gender || "Not specified"}</p>
        <p><Languages className="inline mr-2" size={18} /><b>Languages:</b> {profile.languages || "Not specified"}</p>
        <p><UserCheck className="inline mr-2" size={18} /><b>Type:</b> {profile.type || "Not specified"}</p>
      </div>
    )}
  </div>



        {/* Resume Upload (You can connect with Cloudinary here later) */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="inline mr-2" size={22} />
            Resume Upload
          </h3>
          <p className="text-gray-600 text-md mb-3">
            Upload your resume to apply faster!
          </p>
          {resumeMessage && (
        <div className="mb-2 text-sm text-blue-600">{resumeMessage}</div>
      )}
      {resumeUploading && (
        <div className="mb-2 text-sm text-gray-500">Uploading...</div>
      )}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {!profile.resume ? (
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="border p-2 rounded w-full"
                  onChange={handleFileChange}
                  disabled={resumeUploading}
                />
                <button
                  onClick={handleResumeUpload}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                  disabled={resumeUploading || !file}
                >
                  Upload
                </button>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  View Resume
                </a>
                <button
                  onClick={handleResumeDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                  disabled={resumeUploading}
                >
                  <Trash2 className="mr-2" size={18} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
