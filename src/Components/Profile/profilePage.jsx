import { useEffect, useState } from "react";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config"; // Ensure correct import

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { formState: { isSubmitting } } = useForm();

  useEffect(() => {
    async function fetchProfile() {
      const user = await authService.getCurrentUser();
      if (user) {
        setProfile(user);
        setFormData(user.prefs || {});
        setResume(user.prefs?.resumeFileId || null);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleResumeUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const fileId = await service.uploadResume(selectedFile);
      if (fileId) {
        setResume(fileId);
        setFormData({ ...formData, resumeFileId: fileId });
        setSelectedFile(null);
        await authService.account.updatePrefs({ ...formData, resumeFileId: fileId });
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await authService.account.updatePrefs(formData);
      setProfile({ ...profile, prefs: formData });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleResumeDelete = async () => {
    await service.deleteResume(resume);
    setResume(null);
    setFormData({ ...formData, resumeFileId: "" });
    await authService.account.updatePrefs({ ...formData, resumeFileId: "" });
  };

  if (!profile) return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
  <h2 className="mt-4 text-lg font-medium text-gray-700">
      Loading, please wait...
  </h2>
</div>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row gap-6 p-6">
      {/* Profile Info */}
      <div className="w-1/3 bg-white shadow-lg rounded-xl p-6 text-center">
        <img
          src={profile.prefs?.avatar || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
          alt="Avatar"
          className="w-40 h-40 rounded-full mx-auto border-4 border-white shadow-lg"
        />
        <h2 className="text-3xl font-bold mt-4">{profile.name}</h2>
        <p className="text-gray-500 text-lg">@{profile.prefs?.username || "username"}</p>
        <p className="text-gray-700 font-semibold text-lg">{profile.prefs?.company || "Your Organization"}</p>

        <div className="mt-6 w-full text-left">
          <h3 className="text-xl font-bold mb-2">Contact Info</h3>
          <p className="text-gray-600 text-lg">📧 Email: {profile.email}</p>
          <p className="text-gray-600 text-lg">📞 Phone: {profile.prefs?.phone || "Not provided"}</p>
          <p className="text-gray-600 text-lg">📍 City: {profile.prefs?.city || "Not specified"}</p>
        </div>
        <button onClick={() => setEditing(!editing)} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3 rounded-full">
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Achievements & Resume */}
      <div className="w-2/3 space-y-6 max-h-1/4">
      <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-3xl font-bold mb-4">Achievements & Progress</h3>
          <p className="text-gray-600 text-lg">Track your progress in jobs and internships.</p>
          <div className="space-y-4 mt-4">
            <div>
              <p className="text-gray-700 text-lg font-semibold flex justify-between">Profile Completion: <span className="text-green-500">75%</span></p>
            </div>
            <div>
              <p className="text-gray-700 text-lg font-semibold flex justify-between">Jobs Applied: <span className="text-blue-500">8</span></p>
            </div>
            <div>
              <p className="text-gray-700 text-lg font-semibold flex justify-between">Internships Completed: <span className="text-purple-500">3</span></p>
            </div>
          </div>
        </div>
        <div className="max-w-2/3 max-h-1/4 mt-8 p-8 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-bold mb-6">About</h3>
          {editing ? (
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Add a short bio about yourself."
            />
          ) : (
            <p className="text-gray-600 text-lg">{profile.prefs?.about || "Add a short bio about yourself."}</p>
          )}
        </div>

        {/* Resume Upload Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 max-h-1/4 max-w-2/3">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Resume</h3>

          {!resume ? (
            <>
              <p className="font-bold text-lg text-gray-500 my-4">Add your Resume & get your profile filled in a click!</p>
              <div className="bg-gray-100 p-4 rounded-lg flex h-1/3 justify-between items-center">
                <input type="file" accept="application/pdf" id="resumeUpload" className="hidden" onChange={handleFileChange} />
                <label htmlFor="resumeUpload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-lg px-5 py-2 rounded-md">Choose File</label>
                {selectedFile && <p className="text-gray-700 text-sm">Selected: {selectedFile.name}</p>}
                <button onClick={handleResumeUpload} disabled={isUploading || !selectedFile} className={`px-6 py-2 rounded-md text-white text-lg ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>
                  {isUploading ? "Uploading..." : "Upload Resume"}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-green-100 p-4 rounded-lg flex items-center justify-between">
              <a href={service.getResumeUrl(resume)} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:text-black">View Resume</a>
              <button onClick={handleResumeDelete} className="text-red-500 hover:text-red-600 text-lg font-bold">❌</button>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full">Save Changes</button>
        </div>
      )}
    </div>
  );
}
