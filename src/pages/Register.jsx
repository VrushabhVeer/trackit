// Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../utils/apis.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await registerUser(formData);
      if (res.status === 201) {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-orange-500">Register to trackit.</h2>
          <p className="text-gray-600 text-sm">Track your job applications in one place</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
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
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already a user? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
