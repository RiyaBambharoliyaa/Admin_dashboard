// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    qualification: "",
    technologies: "",
    password: "123",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://examination-backend-wn5h.onrender.com/api/auth/signup",
        {
          ...form,
          technologies: form.technologies
            .split(",")
            .map((tech) => tech.trim()),
        }
      );
      alert("Signup successful!");
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

        {["name", "email", "phone", "role", "qualification", "technologies", ].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full mb-4 p-3 border rounded"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Signup
        </button>

        {/* <p className="text-center t
        ext-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default Signup;
