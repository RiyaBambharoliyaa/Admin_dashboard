import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import {
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
import { logout } from "../features/auth/authSlice"; // Adjust path as needed

const AdminLayout = () => {
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
      <aside className="w-64 bg-gray-500 text-white flex flex-col">
        <div className="p-7 text-2xl font-bold border-b border-gray-300">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-900" : "hover:bg-blue-900"
              }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/roles"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-900" : "hover:bg-blue-900"
              }`
            }
          >
            <FaUserShield />
            Roles
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-900" : "hover:bg-blue-900"
              }`
            }
          >
            <FaChartBar />
            Analytics
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUsers />
            Users
          </NavLink>

          {/* Settings with Dropdown */}
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`flex items-center gap-3 px-4 py-2 rounded w-full text-left hover:bg-gray-700 transition ${
                settingsOpen ? "bg-gray-700" : ""
              }`}
            >
              <FaCog />
              Settings
              <span className="ml-auto gap-1.5">{settingsOpen ? "▲":"▼"}</span>
            </button>

            {settingsOpen && (
              <ul className="ml-8 mt-2 space-y-1">
                <li>
                  <NavLink
                    to="/admin/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-600 ${
                        isActive ? "bg-gray-600 font-semibold" : ""
                      }`
                    }
                    onClick={() => setSettingsOpen(false)}
                  >
                    <FaUserCircle />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/change-password"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-600 ${
                        isActive ? "bg-gray-600 font-semibold" : ""
                      }`
                    }
                    onClick={() => setSettingsOpen(false)}
                  >
                    <FaKey />
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setSettingsOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-600 w-full text-left"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
