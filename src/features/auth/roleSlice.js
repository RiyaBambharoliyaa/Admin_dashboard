// src/features/roles/roleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

// Get token helper
const getToken = () => localStorage.getItem("accessToken");

// ----------------- Async Thunks ------------------

// ✅ Fetch All Roles
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/get-roles`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data?.data?.roles || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch roles");
    }
  }
);

// ✅ Add Role
export const addRole = createAsyncThunk(
  "roles/addRole",
  async (newRole, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/roles`, newRole, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data?.role || newRole;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add role");
    }
  }
);

// ✅ Update Role
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/roles/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res?.data?.updatedRole || { _id: id, ...updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update role");
    }
  }
);

// ✅ Delete Role
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/roles/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id; // only return deleted role id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete role");
    }
  }
);

// ----------------- Slice ------------------
const roleSlice = createSlice({
  name: "roles",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addRole.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateRole.fulfilled, (state, action) => {
        state.list = state.list.map((role) =>
          role._id === action.payload._id ? action.payload : role
        );
      })

      // Delete
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.list = state.list.filter((role) => role._id !== action.payload);
      });
  },
});

export default roleSlice.reducer;
