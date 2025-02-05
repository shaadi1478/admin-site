import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons from lucide-react

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("auth", "true");
        navigate("/");
      } else {
        setError("Invalid credentials! Try again.");
      }
    } else {
      const newUser = { username, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        setIsLogin(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-4xl flex">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {isLogin ? "Welcome Back!" : "Join Us"}
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-400 text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <p className="text-center text-white mt-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-yellow-300 hover:underline focus:outline-none transition"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
