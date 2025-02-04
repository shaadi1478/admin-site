import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login - Username:", username);
      console.log("Login - Password:", password);
    } else {
      console.log("Sign Up - Username:", username);
      console.log("Sign Up - Email:", email);
      console.log("Sign Up - Password:", password);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600"
    >
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-4xl flex">
        {/* Left side: Form container */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
            {isLogin ? "Welcome Back!" : "Join the Library"}
          </h2>
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
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password"
                required
              />
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
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-300 hover:underline focus:outline-none transition"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </form>
        </div>

        {/* Right side: Custom SVG Character */}
        <div className="hidden md:block w-1/2 pl-8">
          {/* Example of SVG Character */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-auto text-white opacity-70"
          >
            {/* Custom Character Illustration (Example) */}
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
