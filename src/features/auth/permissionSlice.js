// src/features/auth/permissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";

// ✅ Fetch permissions for a role
export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (roleId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE}/get-permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allPermissions = res.data?.data?.permissions || [];
      return allPermissions.filter(
        (p) => p.roleId?._id === roleId && p.pageId
      );
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add permission for a role + page
export const addPermission = createAsyncThunk(
  "permissions/addPermission",
  async ({ roleId, pageId, permissions }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${API_BASE}/permissions`,
        { roleId, pageId, permissions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data?.data; // return the created permission object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const permissionSlice = createSlice({
  name: "permissions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPermissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addPermission
      .addCase(addPermission.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      });
  },
});

export default permissionSlice.reducer;
