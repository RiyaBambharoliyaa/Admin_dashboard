import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminLayout from './pages/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Roles from './pages/Roles';
import UsersPage from './pages/UsersPage';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import RoleDetails from './pages/RoleDetails';
import Unothorized from './pages/Unothorized';
import Profile from './pages/Profile';

const App = () => {

  return (
    <Routes>
        
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/unothorizes' element={<Unothorized/>}/>
       <Route 
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path='profile' element={<Profile/>}/>
        <Route path="analytics" element={<Analytics />} />
        <Route path="roles" element={<Roles />} />
       <Route path="signup" element={<Signup />} />
       <Route path="users" element={<UsersPage />} />
       <Route path="change-password" element={<ChangePassword />} />
      <Route path="rolesdetail/:id" element={<RoleDetails />} />
      </Route>

 <Route path="/"
        element={
          <ProtectedRoute userOnly={true}>
            <Home />
          </ProtectedRoute>
        }
      /> 
        </Routes>
  );
};

export default App;
