// // src/pages/Roles.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux'; // get token from Redux

// const Roles = () => {
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { token } = useSelector((state) => state.auth); // get token from auth slice

//   const fetchRoles = async () => {
//     try {
//       const res = await axios.get(
//         'https://examination-backend-wn5h.onrender.com/api/get-roles',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ send token
//           },
//         }
//       );

//       console.log('Roles response:', res.data);
// setRoles(res.data?.data?.roles || []);
//     } catch (error) {
//       console.error('Failed to fetch roles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Roles</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           + Create Role
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading roles...</p>
//       ) : roles.length === 0 ? (
//         <p>No roles found.</p>
//       ) : (
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="border p-2">Role Name</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.map((role) => (
//               <tr key={role._id}>
//                 <td className="border p-2">{role.name}</td>
//                 <td className="border p-2">
//                   <button className="text-green-600 mr-3 hover:underline">Edit</button>
//                   <button className="text-red-600 hover:underline">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Roles;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Roles = () => {
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ name: '', description: '' });

//   const { token } = useSelector((state) => state.auth);

//   const fetchRoles = async () => {
//     try {
//       const res = await axios.get(
//         'https://examination-backend-wn5h.onrender.com/api/get-roles',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setRoles(res.data?.data?.roles || []);
//     } catch (error) {
//       console.error('Failed to fetch roles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createRole = async () => {
//     try {
//       const res = await axios.post(
//         'https://examination-backend-wn5h.onrender.com/api/roles',
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log('Role created:', res.data);
//       setForm({ name: '', description: '' });
//       setShowModal(false);
//       fetchRoles(); // refresh role list
//     } catch (error) {
//       console.error('Failed to create role:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


  
//   const deleteRole = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this role?');
//     if (!confirm) return;

//     try {
//       await axios.delete(`https://examination-backend-wn5h.onrender.com/api/roles/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Refresh role list after deletion
//       setRoles((prev) => prev.filter((role) => role._id !== id));
//     } catch (error) {
//       console.error('Failed to delete role:', error);
//       alert('Error deleting role');
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
//           onClick={() => setShowModal(true)}
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
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="border p-2">Role Name</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.map((role) => (
//               <tr key={role._id}>
//                 <td className="border p-2">{role.name}</td>
//                 <td className="border p-2">
//                   {/* <button className="text-green-600 mr-3 hover:underline">Edit</button> */}
//                   <button
//                     onClick={() => openEditModal(role)}
//                     className="text-green-600 mr-3 hover:underline"
//                   >
//                     Edit
//                   </button>
//                   {/* <button className="text-red-600 hover:underline">Delete</button> */}
//                         <button
//                     onClick={() => deleteRole(role._id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
//             <h3 className="text-xl font-bold mb-4">Create Role</h3>

//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Role Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter role name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Description</label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleInputChange}
//                 placeholder="Enter role description"
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
//               />
//             </div>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={createRole}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               >
//                 Add Role
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Roles;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [addForm, setAddForm] = useState({ name: '', description: '' });

  const reduxToken = useSelector((state) => state.auth.token);
  const token = reduxToken || localStorage.getItem('token');

  const API_BASE = 'https://examination-backend-wn5h.onrender.com/api';

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/get-roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data?.data?.roles || []);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      await axios.delete(`${API_BASE}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Failed to delete role');
    }
  };

  const openEditModal = (role) => {
    setCurrentRole(role);
    setEditForm({ name: role.name, description: role.description });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE}/roles/${currentRole._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Use the updated role from API response
      const updatedRole = res?.data?.updatedRole || editForm;
      setRoles((prev) =>
        prev.map((r) => (r._id === currentRole._id ? { ...r, ...updatedRole } : r))
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const openAddModal = () => {
    setAddForm({ name: '', description: '' });
    setAddModalOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/roles`, addForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newRole = res?.data?.role || addForm;
      setRoles((prev) => [...prev, newRole]);
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Failed to add role');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roles</h2>
        <button
          type="button"
          onClick={openAddModal}
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
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Role Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td className="border p-2">{role.name}</td>
                <td className="border p-2">{role.description}</td>
                <td className="border p-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(role)}
                    className="text-green-600 mr-3 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRole(role._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Role</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Role Name"
                required
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Role</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={addForm.name}
                onChange={handleAddChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Role Name"
                required
              />
              <textarea
                name="description"
                value={addForm.description}
                onChange={handleAddChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
