import { useEffect, useState } from "react";

// Dummy achievements data
const achievementData = {
  internships: {
    label: "Internships Completed",
    value: 3,
    total: 5,
    color: "yellow",
    isPercentage: false,
    isCheck: false,
  },
  jobs: {
    label: "Jobs Applied",
    value: 3,
    total: 10,
    color: "blue",
    isPercentage: false,
    isCheck: false,
  },
  profile: {
    label: "Profile Completion",
    value: 60,
    total: 100,
    color: "green",
    isPercentage: true,
    isCheck: false,
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data
  useEffect(() => {
    const dummyProfile = {
      name: "Aaditya Aggarwal",
      email: "aaditya@gmail.com",
      phone: "9876543210",
      city: "Delhi",
      gender: "Male",
      type: "Fresher",
      languages: "English,Hindi",
      username: "aaditya123",
      avatar: "",
    };

    setTimeout(() => {
      setProfile(dummyProfile);
      setFormData(dummyProfile);
      setLoading(false);
    }, 1000); // simulate 1 sec loading
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row gap-6 p-6">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 text-center space-y-6">
        {/* Avatar + Info */}
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
          <p className="text-gray-500 text-lg">@{profile.username}</p>
          <p className="text-gray-700 font-semibold text-lg">
            {profile.workField}
          </p>
        </div>

        {/* About */}
        <div className="text-left">
          <h3 className="text-xl font-bold mb-2">📝 About</h3>
          {editing ? (
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-md p-2 text-gray-700"
            />
          ) : (
            <p className="text-gray-600 text-md">{profile.about}</p>
          )}
        </div>

        {/* Achievements */}
        <div className="text-left w-full">
          <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>
          <div className="space-y-4">
            {Object.entries(achievementData).map(
              ([
                key,
                { label, value, total, color, isPercentage, isCheck },
              ]) => {
                const percent = isPercentage
                  ? value
                  : Math.min((value / total) * 100, 100);
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 text-md font-medium">
                        {label}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {isCheck
                          ? value === total
                            ? "✔️"
                            : "❌"
                          : isPercentage
                          ? `${percent}%`
                          : `${value} / ${total}`}
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
              }
            )}
          </div>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="w-2/3 space-y-6">
        {/* Profile Details Section */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
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

          {/* Fields */}
          {editing ? (
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["Name", "name"],
                ["Email", "email"],
                ["Phone", "phone"],
                ["City", "city"],
                ["Gender", "gender"],
                ["Type", "type"],
                ["Languages", "languages"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={name === "email"}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
              <p>
                <b>📛 Name:</b> {profile.name}
              </p>

              <p>
                <b>📧 Email:</b> {profile.email}
              </p>
              <p>
                <b>📱 Phone:</b> {profile.phone}
              </p>
              <p>
                <b>🏙️ City:</b> {profile.city}
              </p>
              <p>
                <b>⚧️ Gender:</b> {profile.gender}
              </p>
              <p>
                <b>👤 Type:</b> {profile.type}
              </p>
              <p>
                <b>🗣️ Languages:</b> {profile.languages}
              </p>
            </div>
          )}
        </div>

        {/* Resume Upload Placeholder */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-4">Resume Upload</h3>
          <p className="text-gray-600 text-md mb-3">
            Upload your resume to apply faster!
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              className="border p-2 rounded w-full"
              disabled
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              disabled
            >
              Upload (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
