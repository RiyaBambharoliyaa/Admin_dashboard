import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  FaBars,
  FaTachometerAlt,
  FaUserShield,
  FaChartBar,
  FaUsers,
  FaCog,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 w-64`}
      >
        {/* Top Section with Hamburger */}
        <div className="p-7 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Main Menu (Collapsible) */}
        {!collapsed && (
          <nav className="flex-1 p-3 space-y-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-900"
                }`
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>

            <NavLink
              to="/admin/roles"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-900"
                }`
              }
            >
              <FaUserShield /> Roles
            </NavLink>

            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-900"
                }`
              }
            >
              <FaChartBar /> Analytics
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-900"
                }`
              }
            >
              <FaUsers /> Users
            </NavLink>

            {/* Settings Dropdown */}
            <div>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-md w-full text-left hover:bg-blue-900 transition"
              >
                <FaCog /> Settings
                <span className="ml-auto">{settingsOpen ? "▲" : "▼"}</span>
              </button>

              {settingsOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/profile"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-700 ${
                          isActive ? "bg-blue-700" : ""
                        }`
                      }
                    >
                      <FaUserCircle /> Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/change-password"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-700 ${
                          isActive ? "bg-blue-700" : ""
                        }`
                      }
                    >
                      <FaKey /> Change Password
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-700 w-full text-left"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
