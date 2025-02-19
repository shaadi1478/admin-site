import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../../Firebase/Firebase.init";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleWithGoogleSign = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("auth", "true");
        setSuccess("Login successful! Welcome back.");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError("Invalid credentials! Try again.");
      }
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
      if (!emailRegex.test(email)) {
        setError("Email must be 6 characters (letters, numbers, hyphens) @mangrove.edu.bd");
        return;
      }
      
      // Validate password format
      const passwordRegex = /^\d{6}$/;
      if (!passwordRegex.test(password)) {
        setError("Password must be a 6-digit number");
        return;
      }
      
      const newUser = { username, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setSuccess("Account created successfully! You can now login.");
      setTimeout(() => {
        setIsLogin(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="relative bg-white/10 backdrop-blur-lg px-4 py-6 md:px-8 md:py-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex min-w-[300px]">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
            {isLogin ? "Welcome Back!" : "Join Us"}
          </h2>

          {error && (
            <Popup
              type="error"
              message={error}
              onClose={() => setError("")}
            />
          )}

          {success && (
            <Popup
              type="success"
              message={success}
              onClose={() => {
                setSuccess("");
                if (isLogin) navigate("/dashboard");
              }}
            />
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="enter your email"
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
                placeholder="enter admin username"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="enter your password"
                required
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 rounded border-gray-300 bg-white/10"
                />
                <label htmlFor="showPassword" className="ml-2 text-sm text-white hover:text-yellow-300 cursor-pointer">
                  Show Password
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 hover:bg-opacity-90"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button onClick={handleWithGoogleSign} className="w-full py-3 flex items-center justify-center gap-5 mt-1 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 hover:bg-opacity-90"
            >Sign In With Google <FcGoogle  className="text-2xl"/></button>
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
