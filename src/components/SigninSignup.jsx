import React, { useState } from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const api_url = "https://user-api-6rny.onrender.com/users";

function SigninSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [issignUp, setIssignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);


  const accountinfo = (term) => {
    setIssignUp(term === "signup")
    setMessage("")
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (issignUp) {


      if (password !== confirmPassword) {
        setMessage("Passwords do not match!");
        setLoading(false);
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setMessage("Email alreadsy exists!");
        setLoading(false);
        return;
      }
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));


      setMessage("Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setIssignUp(false);
      setLoading(false);
    } else {








      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        setMessage("Login successful!");
        setEmail("");
        setPassword("");


        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage("Invalid email or password");
      }
      setLoading(false);
    }
  };




  
  return (
    <div className='flex justify-center items-center min-h-screen  px-4 '>
      <div className="w-full max-w-md  p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300">
        <div className='flex mb-6  '>
          <button
            className={`flex-1 py-2 text-lg sm:text-xl font-semibold transition-all duration-200 ${!issignUp
              ? "border-b-4 border-(--dark) "
              : "text-gray-500"
              }`}
            onClick={() => accountinfo("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-lg sm:text-xl font-semibold transition-all duration-200 ${issignUp
              ? "border-b-4 border-(--dark)"
              : "text-gray-500"

              }`}
            onClick={() => accountinfo("signup")}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {issignUp && (
            <div className='mb-4'>

              <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className='mb-4'>

            <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {issignUp && (
            <div className="mb-4 relative">
              <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Confirm your password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y- right-3 top-10 flex items-center text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-(--dark) text-(--light) py-2 rounded-lg text-lg sm:text-xl font-semibold cursor-pointer transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> {/* Spinner icon */}
                {issignUp ? "Signing Up..." : "Signing In..."}
              </>
            ) : issignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button> </form>
        {message && <p className="mt-4 text-center">{message}</p>}

        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
          {issignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => accountinfo(issignUp ? "signin" : "signup")}
          >
            {issignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default SigninSignup