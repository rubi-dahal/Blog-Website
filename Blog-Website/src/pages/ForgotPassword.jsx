import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check passwords
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Check password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/update-user",
        {
          email: email,
          password: password,
        }
      );

      toast.success(res.data.message);

      // Clear fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go back to login
      navigate("/signin");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Password reset failed!"
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
        <h2 className="text-white text-2xl font-bold mb-3">
          RESET PASSWORD
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Enter your email and choose a new password.
        </p>

        <form onSubmit={handleResetPassword}>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* New Password */}
          <div className="mb-4 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#1f2d52] text-white font-bold hover:bg-[#293b6a] transition-colors"
          >
            RESET PASSWORD
          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-5 text-sm">
          <Link
            to="/signin"
            className="text-blue-400 hover:underline"
          >
            BACK TO LOGIN
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;