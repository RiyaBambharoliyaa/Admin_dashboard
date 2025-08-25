// src/features/auth/pageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://examination-backend-wn5h.onrender.com/api";
const token = localStorage.getItem("accessToken");

// Thunk to fetch all pages
export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/get-pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data.data.pages);
      return res.data?.data?.pages || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching pages");
    }
  }
);
// console.log(fetchPages());

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    pages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pageSlice.reducer;
