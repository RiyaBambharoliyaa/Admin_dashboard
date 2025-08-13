import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Icons

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    qualification: "",
    technologies: "",
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let fetchedUsers = [];

      if (res.data?.data?.user) {
        fetchedUsers = [res.data.data.user];
      } else if (Array.isArray(res.data?.data?.users)) {
        fetchedUsers = res.data.data.users;
      }

      const normalized = fetchedUsers.map((u) => ({
        ...u,
        userId: u.userId || u._id || u.id,
      }));

      setUsers(normalized);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("Delete failed: userId is missing");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete(`${API_BASE}/auth/delete-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { userId },
      });

      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEditUser = (user) => {
    setEditForm({
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      qualification: user.qualification,
      technologies: Array.isArray(user.technologies)
        ? user.technologies.join(", ")
        : user.technologies || "",
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(
        `${API_BASE}/auth/update-profile`,
        {
          ...editForm,
          technologies: editForm.technologies
            .split(",")
            .map((tech) => tech.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("User updated successfully");
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  if (loading) return <p className="text-center py-6">Loading users...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-bold">Users List</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg sm:w-auto hover:bg-gray-600"
          onClick={() => navigate("/admin/signup")}
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Qualification</th>
                <th className="border p-2">Technologies</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.phone}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">{u.qualification}</td>
                  <td className="border p-2">{u.technologies?.toString()}</td>
                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                      <FaEdit
                        className="text-green-600 cursor-pointer hover:text-green-800 transition-colors duration-200"
                        size={16} // smaller on mobile
                        onClick={() => handleEditUser(u)}
                      />
                      <FaTrashAlt
                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200"
                        size={16}
                        onClick={() => handleDeleteUser(u.userId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <form onSubmit={handleUpdateUser} className="space-y-3">
              {["name", "email", "phone", "role", "qualification"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editForm[field]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [field]: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                )
              )}
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={editForm.technologies}
                onChange={(e) =>
                  setEditForm({ ...editForm, technologies: e.target.value })
                }
                className="border p-2 w-full rounded"
              />
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
