import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [form, setForm] = useState({
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
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
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

      if (!response.ok) {
        // Handle error responses
        if (data.errors) {
          setErrors(data.errors);
        }
        setMessage(data.message || "Login failed. Please try again.");
        return;
      }

      if (data.success) {
        setMessage(data.message || "Login successful!");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#89898938]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#6C5CD3]">Login</h2>
        
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${errors.email ? "border-red-500" : "focus:border-[#6C5CD3]"}`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email[0]}</div>
            )}
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${errors.password ? "border-red-500" : "focus:border-[#6C5CD3]"}`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password[0]}</div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C5CD3] text-white py-2 rounded hover:bg-[#5543b7] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;