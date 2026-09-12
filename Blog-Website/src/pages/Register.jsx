// Register.jsx

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const details = Object.fromEntries(formData);

    try {
      await axios.post(
        "http://localhost:3000/register",
        details
      );

      e.target.reset();

      toast.success("Registered Successfully!");

      navigate("/signin");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Registration failed!"
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
          REGISTER
        </h2>

        {/* Register Form */}
        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="input-group mb-4 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              required
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div className="input-group mb-4 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
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
              name="password"
              placeholder="Enter Password"
              required
              minLength="6"
              className="w-full p-2 rounded bg-white/10 text-white text-sm outline-none"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#1f2d52] text-white font-bold hover:bg-[#293b6a] transition-colors"
          >
            REGISTER
          </button>

        </form>

        {/* Sign In Link */}
        <p className="text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-white hover:underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
};

export default Register;