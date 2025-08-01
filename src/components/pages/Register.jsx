import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null })); // Clear only that field's error
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessage(data.message || "Registration successful!");
        setForm({
          name: "",
          email: "",
          password: "",
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/"); 
      } else {
        setMessage(data.message || "Registration failed.");
        setErrors(data.errors || {});
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#89898938]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#6C5CD3]">Register</h2>
        {message && (
          <div
            className={`mb-4 text-center ${
              errors && Object.keys(errors).length
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-[#6C5CD3] ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <div className="text-red-500 text-sm mb-2">{errors.name[0]}</div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-[#6C5CD3] ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mb-2">{errors.email[0]}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:border-[#6C5CD3] ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <div className="text-red-500 text-sm mb-2">
              {errors.password[0]}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#6C5CD3] text-white py-2 rounded hover:bg-[#5543b7] transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
