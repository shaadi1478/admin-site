import { useState, useEffect } from "react";
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
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const isValid = password.length >= 6;
    setIsPasswordValid(isValid);
  }, [password]);

  useEffect(() => {
    const checkValidity = () => {
      if (isLogin) {
        return username.trim() && password.trim() && isPasswordValid;
      } else {
        return email.trim() && username.trim() && password.trim() && isPasswordValid;
      }
    };
    setIsFormValid(checkValidity());
  }, [email, password, isLogin, username, isPasswordValid]);

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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

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
      const newUser = { username, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setSuccess("Account created successfully! You can now login.");
      setTimeout(() => {
        setIsLogin(true);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="relative bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 md:mx-auto">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 text-center">
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
                className={`w-full py-2 md:py-3 text-sm md:text-base font-semibold rounded-lg transition-colors duration-300 ${
                  isFormValid 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                disabled={!isFormValid}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <button
                onClick={handleWithGoogleSign}
                className="w-full py-2 md:py-3 flex items-center justify-center gap-2 md:gap-3 mt-2 bg-white text-blue-600 text-sm md:text-base font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Sign In With Google
                <FcGoogle className="text-xl md:text-2xl" />
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
    </div>
  );
};

export default Login;
