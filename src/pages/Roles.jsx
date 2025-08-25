// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Roles = () => {
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [currentRole, setCurrentRole] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", description: "" });
//   const [addForm, setAddForm] = useState({ name: "", description: "" });

//   const reduxToken = useSelector((state) => state.auth.token);
//   const token = reduxToken || localStorage.getItem("token");

//   const API_BASE = "https://examination-backend-wn5h.onrender.com/api";
//   const navigate = useNavigate();

//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/get-roles`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRoles(res.data?.data?.roles || []);
//     } catch (error) {
//       console.error("Failed to fetch roles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteRole = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this role?")) return;
//     try {
//       await axios.delete(`${API_BASE}/roles/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRoles((prev) => prev.filter((r) => r._id !== id));
//     } catch (error) {
//       console.error("Error deleting role:", error);
//       alert("Failed to delete role");
//     }
//   };

//   const openEditModal = (role) => {
//     setCurrentRole(role);
//     setEditForm({ name: role.name, description: role.description });
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         `${API_BASE}/roles/${currentRole._id}`,
//         editForm,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const updatedRole = res?.data?.updatedRole || editForm;
//       setRoles((prev) =>
//         prev.map((r) =>
//           r._id === currentRole._id ? { ...r, ...updatedRole } : r
//         )
//       );
//       setEditModalOpen(false);
//     } catch (error) {
//       console.error("Error updating role:", error);
//       alert("Failed to update role");
//     }
//   };

//   const openAddModal = () => {
//     setAddForm({ name: "", description: "" });
//     setAddModalOpen(true);
//   };

//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_BASE}/roles`, addForm, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const newRole = res?.data?.role || addForm;
//       setRoles((prev) => [...prev, newRole]);
//       setAddModalOpen(false);
//     } catch (error) {
//       console.error("Error adding role:", error);
//       alert("Failed to add role");
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Roles</h2>
//         <button
//           type="button"
//           onClick={openAddModal}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add New Role
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading roles...</p>
//       ) : roles.length === 0 ? (
//         <p>No roles found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border min-w-[600px]">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="border p-2">Role Name</th>
//                 <th className="border p-2">Description</th>
//                 <th className="border p-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {roles.map((role) => (
//                 <tr
//                   key={role._id}
//                   className="hover:bg-gray-300 cursor-pointer"
//                 >
//                   <td
//                     className="border p-2"
//                     onClick={() => navigate(`/admin/rolesdetail/${role._id}`)}
//                   >
//                     {role.name}
//                   </td>
//                   <td
//                     className="border p-2"
//                     onClick={() => navigate(`/admin/rolesdetail/${role._id}`)}
//                     >
//                     {role.description}
//                   </td>
//                   <td className="border p-2 text-center">
//                     <div className="flex flex-wrap justify-center items-center gap-3">
//                       <FaEdit
//                         className="text-green-600 cursor-pointer hover:text-green-800"
//                         size={18}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           openEditModal(role);
//                         }}
//                       />
//                       <FaTrash
//                         className="text-red-600 cursor-pointer hover:text-red-800"
//                         size={18}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteRole(role._id);
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Edit Role</h3>
//             <form onSubmit={handleEditSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={editForm.name}
//                 onChange={handleEditChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Role Name"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={editForm.description}
//                 onChange={handleEditChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Description"
//                 required
//               />
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setEditModalOpen(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Add Modal */}
//       {addModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Add New Role</h3>
//             <form onSubmit={handleAddSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={addForm.name}
//                 onChange={handleAddChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Role Name"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={addForm.description}
//                 onChange={handleAddChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Description"
//                 required
//               />
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setAddModalOpen(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Add
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Roles;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addRole, deleteRole, fetchRoles, updateRole } from "../features/auth/roleSlice";

const Roles = () => {
  const { list: roles, loading } = useSelector((state) => state.roles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addRole(form));
    setAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRole({ id: currentRole._id, updatedData: form }));
    setEditModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles</h2>
        <button
          onClick={() => {
            setForm({ name: "", description: "" });
            setAddModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Role
        </button>
      </div>

      {loading ? (
        <p>Loading roles...</p>
      ) : roles.length === 0 ? (
        <p>No roles found.</p>
      ) : (
        <table className="w-full border-collapse border min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Role Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id} className="hover:bg-gray-300 cursor-pointer">
                <td onClick={() => navigate(`/admin/rolesdetail/${role._id}`)} className="border p-2">
                  {role.name}
                </td>
                <td onClick={() => navigate(`/admin/rolesdetail/${role._id}`)} className="border p-2">
                  {role.description}
                </td>
                <td className="border p-2 text-center">
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    <FaEdit
                      className="text-green-600 cursor-pointer"
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentRole(role);
                        setForm({ name: role.name, description: role.description });
                        setEditModalOpen(true);
                      }}
                    />
                    <FaTrash
                      className="text-red-600 cursor-pointer"
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteRole(role._id));
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Role</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Role Name"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
                required
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setEditModalOpen(false)} type="button" className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Role</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Role Name"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
                required
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setAddModalOpen(false)} type="button" className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
