import React, { useState } from "react";
import NewsLatterBox from "../components/NewsLatterBox";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      if (!result.success) {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-[130px] pt-5 flex flex-col justify-center items-center gap-y-10">
      <div className="w-[400px] flex flex-col justify-center items-center gap-y-10 bg-white p-6">
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="font-semibold text-2xl">
            <span className="font-extralight text-gray-500">Sign </span> Up
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>

        {error && (
          <div className="w-full p-3 text-sm text-red-500 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col w-full">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isLoading}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-[150px] py-2 px-12 bg-black text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[black] transition duration-200 ease-in-out ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <NewsLatterBox />
    </div>
  );
};

export default Register;