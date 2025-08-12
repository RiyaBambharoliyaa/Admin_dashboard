import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }
    if (!oldPassword || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_BASE}/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message || "Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate('/login');
      
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl mb-6 font-semibold">Change Password</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={loading}
        />
      </div>

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePassword;
