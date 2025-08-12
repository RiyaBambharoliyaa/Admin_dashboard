// src/pages/Login.jsx
// src/pages/Login.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    dispatch(loginUser(payload))
      .unwrap()
      .then((res) => {
        if (res.user.role === "admin" || res.user.role === "super-admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <p className="text-center text-sm mt-4">
        
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            forgot password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

