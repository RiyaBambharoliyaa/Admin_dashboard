import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    technologies: ""
  });

  const navigate = useNavigate();

  // Fetch users
  useEffect(()=>{
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
  fetchUsers()
  },[users])


  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("Delete failed: userId is missing");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

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

  // Open edit modal
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
        : user.technologies || ""
    });
    setShowEditModal(true);
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(`${API_BASE}/auth/update-profile`, {
        ...editForm,
        technologies: editForm.technologies
          .split(",")
          .map((tech) => tech.trim())
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("User updated successfully");
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };



  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users List</h2>
        <button
          className="bg-gray-500  text-white px-3 py-1 rounded-2xl"
          onClick={() => navigate("/admin/signup")}
        >
        + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Qualification</th>
              <th className="border p-2">Technologies</th>
              <th className="border p-2">Actions</th>
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
                  <button
                    className="bg-red-800 text-white px-3 py-1 rounded mx-2"
                    onClick={() => handleDeleteUser(u.userId)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-900 text-white px-3 py-1 rounded"
                    onClick={() => handleEditUser(u)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <form onSubmit={handleUpdateUser}>
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Role"
                value={editForm.role}
                onChange={(e) =>
                  setEditForm({ ...editForm, role: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Qualification"
                value={editForm.qualification}
                onChange={(e) =>
                  setEditForm({ ...editForm, qualification: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={editForm.technologies}
                onChange={(e) =>
                  setEditForm({ ...editForm, technologies: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-400 text-white px-3 py-1 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
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
