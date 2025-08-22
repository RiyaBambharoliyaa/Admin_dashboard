// src/pages/Profile.jsx
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useState } from "react";
import { FaPen, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

const Profile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const nav = useNavigate()

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    qualification: user?.qualification || "",
    technologies: user?.technologies || [],
    profileImage: user?.profileImage || "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "technologies") {
      setProfileData((prev) => ({
        ...prev,
        technologies: value.split(",").map((t) => t.trim()),
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      let uploadedImageUrl = profileData.profileImage;

      // 🖼 Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("profileImage", imageFile);

        const uploadRes = await axios.post(
          `${API_BASE}/auth/upload-profile-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        uploadedImageUrl = uploadRes.data?.imageUrl;
      }

      // 📝 Update profile (including image)
      const res = await axios.put(
        `${API_BASE}/auth/update-profile-image`,
        { ...profileData, profileImage: uploadedImageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const updatedUser = { ...user, ...res.data.data };
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setIsEditing(false);
      setImageFile(null);
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative p-6 max-w-2xl w-full mx-auto bg-white rounded-lg shadow">
        {/* Close button for modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : profileData.profileImage
                ? profileData.profileImage.startsWith("http")
                  ? profileData.profileImage
                  : `${API_BASE}${profileData.profileImage}`
                : "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border mb-2"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p>{profileData.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Email:</label>
            <p>{profileData.email}</p>
          </div>

          <div>
            <label className="block font-medium">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Qualification:</label>
            {isEditing ? (
              <input
                type="text"
                name="qualification"
                value={profileData.qualification}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p>{profileData.qualification}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Technologies:</label>
            {isEditing ? (
              <input
                type="text"
                name="technologies"
                value={profileData.technologies.join(", ")}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p>{profileData.technologies.join(", ")}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-end">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
              <Link
                onClick={() => {
                  setIsEditing(false);
                  setImageFile(null);
                  nav('/header')
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </Link>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FaPen /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
