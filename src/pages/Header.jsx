import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../features/auth/authSlice"; // setUser action import kiya
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaPen, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    qualification: "",
    technologies: [],
  });

  // Open modal and load user data
  const openProfileModal = () => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        qualification: user.qualification || "",
        technologies: user.technologies || [],
      });
    }
    setIsEditing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };

  // Handle input changes for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "technologies") {
      const techs = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean); // remove empty strings
      setProfileData((prev) => ({
        ...prev,
        technologies: techs,
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save updated profile to backend and update Redux + localStorage
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userId = user.userId || user.id || user._id;

      if (!userId) {
        alert("User ID is missing. Cannot update profile.");
        return;
      }

      // Exclude role from update body (usually not editable)
      const { role, ...rest } = profileData;
      const body = {
        userId,
        ...rest,
      };

      const res = await axios.put(`${API_BASE}/auth/update-profile`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      setIsEditing(false);
      setModalOpen(false);

      // Backend se updated user mil raha hai ya nahi check karo
      if (res.data && res.data.updatedUser) {
        // Redux store + localStorage update
        dispatch(setUser(res.data.updatedUser));
      } else {
        // Agar backend updated user nahi bhejta, to frontend wali profileData se update karo
        dispatch(setUser({ ...user, ...rest }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to update profile");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white shadow-md px-6 py-7 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black-900">Dashboard</h1>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 object-cover"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-600" />
            )}
            <span className="font-medium text-gray-700 hidden sm:block">
              Welcome {user?.name || "User"}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    openProfileModal();
                    setDropdownOpen(false);
                  }}
                >
                  <FaUserCircle className="text-gray-500" /> Profile
                </li>
                  
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Profile Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)", // white translucent background
            backdropFilter: "blur(8px)", // smooth blur effect
            WebkitBackdropFilter: "blur(8px)",
            transition: "opacity 0.3s ease",
          }}
          onClick={closeModal} // close modal on clicking outside content
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close on clicking inside modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Profile</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                ) : (
                  <p>{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Phone:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                ) : (
                  <p>{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Role:</label>
                <p>{profileData.role}</p>
              </div>

              <div>
                <label className="block font-medium mb-1">Qualification:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="qualification"
                    value={profileData.qualification}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                ) : (
                  <p>{profileData.qualification}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Technologies (comma separated):
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="technologies"
                    value={profileData.technologies.join(", ")}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                ) : (
                  <p>{profileData.technologies.join(", ")}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    <FaSave className="inline mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  <FaPen /> Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
