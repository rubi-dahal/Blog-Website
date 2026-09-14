
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/login" || "https://blog-website-0c9o.onrender.com/login",
        {
          email: email,
          password: password,
        }
      );

      if (res.data.message === "You Logged In successfully!!!") {
        // Save login information
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userName", res.data.user.name);

        toast.success("Logged in Successfully!");

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#0b0f1a] font-sans">

      <div className="container relative w-[350px] bg-white/5 rounded-[15px] p-6 text-center shadow-md backdrop-blur">

        {/* Back Button */}
        <button
          type="button"
          onClick={goBack}
          className="w-[30px] h-[30px] absolute top-2 right-2 text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors duration-300"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-white text-2xl font-bold mb-6">
          LOGIN
        </h2>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-group mb-4 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="input-group mb-6 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#1f2d52] text-white font-bold hover:bg-[#293b6a] transition-colors"
          >
            LOGIN
          </button>

        </form>

        {/* Footer */}
        <div className="footer flex justify-between mt-4 text-sm text-white">

          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            REGISTER
          </Link>

          <Link
            to="/forgot-password"
            className="text-blue-400 hover:underline"
          >
            FORGOT PASSWORD
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Signin;
