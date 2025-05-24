import React, { useState } from "react";
import NewsLatterBox from "../components/NewsLatterBox";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || "Login failed. Please try again.");
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
          <p className="font-semibold text-2xl">Login</p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>

        {error && (
          <div className="w-full p-3 text-sm text-red-500 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col w-full">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[black]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link to="/forgot-password"  className="text-[#414141] hover:underline">
           
              Forgot your password?
            </Link>
            <Link to="/register" className="text-[#414141] hover:underline">
              Create account
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center self-center w-[150px] py-2 px-12 bg-black text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[black] transition duration-200 ease-in-out ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
      <NewsLatterBox />
    </div>
  );
};

export default Login;
