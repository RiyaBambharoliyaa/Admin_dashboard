// import { useDispatch, useSelector } from "react-redux";
// import { logout, setUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { FaUserCircle, FaPen, FaSave, FaTimes } from "react-icons/fa";
// import axios from "axios";

// const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "",
//     qualification: "",
//     technologies: [],
//     profileImage: "", // 🆕 store image URL
//   });

//   const [imageFile, setImageFile] = useState(null); // 🆕 store file

//   const openProfileModal = () => {
//     if (user) {
//       setProfileData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         role: user.role || "",
//         qualification: user.qualification || "",
//         technologies: user.technologies || [],
//         profileImage: user.profileImage || "",
//       });
//     }
//     setIsEditing(false);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setIsEditing(false);
//     setImageFile(null); // 🆕 reset image
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "technologies") {
//       const techs = value
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean);
//       setProfileData((prev) => ({
//         ...prev,
//         technologies: techs,
//       }));
//     } else {
//       setProfileData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   // 🆕 Final Correct Image Upload + Update
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const userId = user._id;

//       let uploadedImageUrl = profileData.profileImage;

//       // agar naya image select hua hai to upload karo
//       if (imageFile) {
//         const formData = new FormData();
//         formData.append("profileImage", imageFile); // ✅ correct key use karo

//         const uploadRes = await axios.post(
//           `${API_BASE}/auth/upload-profile-image`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // backend se jo field return hoti hai use set karo (maan lo imageUrl)
//         uploadedImageUrl = uploadRes.data?.imageUrl;
//       }

//       // ab user update API call karo
//       const res = await axios.put(
//         `${API_BASE}/users/update/${userId}`,
//         {
//           name: profileData.name,
//           email: profileData.email,
//           phone: profileData.phone,
//           qualification: profileData.qualification,
//           technologies: profileData.technologies,
//           profileImage: uploadedImageUrl,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data) {
//         dispatch(setUser(res.data));
//         localStorage.setItem("user", JSON.stringify(res.data));
//       }

//       setIsEditing(false);
//       setModalOpen(false);
//       setImageFile(null);
//     } catch (error) {
//       console.error("Profile update error:", error.response?.data || error);
//       alert(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md px-6 py-7 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-black-900">Dashboard</h1>
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen((prev) => !prev)}
//             className="flex items-center gap-2 focus:outline-none"
//           >
//             {user?.profileImage ? (
//               <img
//                 src={user.profileImage}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full border border-gray-300 object-cover"
//               />
//             ) : (
//               <FaUserCircle className="text-3xl text-gray-600" />
//             )}
//             <span className="font-medium text-gray-700 hidden sm:block">
//               WELCOME {user?.name?.toUpperCase() || "User"}
//             </span>
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
//               <ul className="py-1">
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
//                   onClick={() => {
//                     openProfileModal();
//                     setDropdownOpen(false);
//                   }}
//                 >
//                   <FaUserCircle className="text-gray-500" /> Profile
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium"
//                   onClick={() => {
//                     setDropdownOpen(false);
//                     handleLogout();
//                   }}
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Profile Modal */}
//       {modalOpen && (
//         <div
//           className="fixed inset-0 flex justify-center items-center z-50"
//           style={{
//             backgroundColor: "rgba(255, 255, 255, 0.85)",
//             backdropFilter: "blur(8px)",
//             WebkitBackdropFilter: "blur(8px)",
//           }}
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">User Profile</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {/* Profile Image */}
//               <div className="flex flex-col items-center">
//                 <img
//                   src={
//                     imageFile
//                       ? URL.createObjectURL(imageFile)
//                       : profileData.profileImage ||
//                         "https://via.placeholder.com/100"
//                   }
//                   alt="Profile Preview"
//                   className="w-20 h-20 rounded-full object-cover border mb-2 cursor-pointer"
//                   onClick={() => document.getElementById("fileInput").click()}
//                 />
//                 <input
//                   id="fileInput"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block font-medium mb-1">Name:</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-3 py-2"
//                   />
//                 ) : (
//                   <p>{profileData.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block font-medium mb-1">Email:</label>
//                 <p>{profileData.email}</p>
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block font-medium mb-1">Phone:</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="phone"
//                     value={profileData.phone}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-3 py-2"
//                   />
//                 ) : (
//                   <p>{profileData.phone}</p>
//                 )}
//               </div>

//               {/* Role */}
//               <div>
//                 <label className="block font-medium mb-1">Role:</label>
//                 <p>{profileData.role}</p>
//               </div>

//               {/* Qualification */}
//               <div>
//                 <label className="block font-medium mb-1">Qualification:</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="qualification"
//                     value={profileData.qualification}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-3 py-2"
//                   />
//                 ) : (
//                   <p>{profileData.qualification}</p>
//                 )}
//               </div>

//               {/* Technologies */}
//               <div>
//                 <label className="block font-medium mb-1">
//                   Technologies (comma separated):
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="technologies"
//                     value={profileData.technologies.join(", ")}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded px-3 py-2"
//                   />
//                 ) : (
//                   <p>{profileData.technologies.join(", ")}</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end gap-3">
//               {isEditing ? (
//                 <>
//                   <button
//                     onClick={handleSave}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     <FaSave className="inline mr-1" />
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setIsEditing(false)}
//                     className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   <FaPen /> Edit
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;


// src/components/Header.jsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage.startsWith("http") ? user.profileImage : `https://examination-backend-wn5h.onrender.com${user.profileImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600" />
          )}
          <span className="font-medium text-gray-700 hidden sm:block">
            WELCOME {user?.name?.toUpperCase() || "USER"}
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => {
                  navigate("/admin/profile");
                  setDropdownOpen(false);
                }}
              >
                <FaUserCircle className="text-gray-500" /> Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
