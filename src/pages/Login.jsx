import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users/login", formData);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", JSON.stringify(res.data.userName));
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-orange-500">Welcome to trackit.</h2>
          <p className="text-gray-600 text-sm">Track your job applications in one place</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="mr-2"
            />
            <span className="text-sm">Show Password</span>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          New user? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
