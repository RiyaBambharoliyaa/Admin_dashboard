import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import roleReducer from '../features/auth/roleSlice';
import pageReducer from '../features/auth/pageSlice';
import permissionReducer from '../features/auth/permissionSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: roleReducer,
    pages: pageReducer, 
    permissions: permissionReducer,

  },
});