import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RoleDetails = () => {
  const { id } = useParams();
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

  // Fetch Role Details
  const fetchRoleDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const roles = res.data?.data?.roles || [];
      const foundRole = roles.find((r) => r._id === id);
      setRole(foundRole || null);
    } catch (error) {
      console.error("Error fetching role details:", error);
    }
  };

  
  // Fetch Permissions for this Role
  const fetchPermissions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allPermissions = res.data?.data?.permissions || [];

      // Only include permissions for this specific role and valid pages
      const rolePermissions = allPermissions.filter(
        (p) => p.roleId?._id === id && p.pageId
      );

      setPermissions(rolePermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchRoleDetails(), fetchPermissions()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  if (loading) return <p className="p-4">Loading role details...</p>;
  if (!role) return <p className="p-4">Role not found.</p>;

  return (
    <div className="p-6">
      <Link
        to="/admin/roles"
        className="text-blue-600 hover:underline mb-4 block"
      >
        ← Back to Roles
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        Menu Role Mapping for Role : {role.name?.toUpperCase()}
      </h1>
      <p className="mb-4">
        <strong>Description:</strong> {role.description}
      </p>

      {/* Permissions Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Page Name</th>
              <th className="border p-2">View</th>
              <th className="border p-2">Add</th>
              <th className="border p-2">Update</th>
              <th className="border p-2">Delete</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm._id}>
                <td className="border p-2 capitalize">{perm.pageId?.name}</td>

                {/* ✅ or ❌ instead of checkboxes */}
                <td className="border p-2 text-center">
                  {perm.permissions.includes("read") ? "✅" : "❌"}
                </td>
                <td className="border p-2 text-center">
                  {perm.permissions.includes("create") ? "✅" : "❌"}
                </td>
                <td className="border p-2 text-center">
                  {perm.permissions.includes("update") ? "✅" : "❌"}
                </td>
                <td className="border p-2 text-center">
                  {perm.permissions.includes("delete") ? "✅" : "❌"}
                </td>

                <td className="border p-2 text-center">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}

            {permissions.length === 0 && (
              <tr>
                <td colSpan="6" className="border p-4 text-center">
                  No permissions found for this role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleDetails;
