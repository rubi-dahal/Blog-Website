
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated");

    if (isAuthenticated !== "true") {
      navigate("/signin");
    }
  }, [navigate]);

  const createBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const details = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/postBlog",
        details
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Blog is created successfully!");

        e.target.reset();

        goBack();
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Blog creation failed"
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">

      {/* Back Button */}
      <button
        type="button"
        onClick={goBack}
        className="w-[40px] h-[40px] text-2xl absolute top-1.5 right-1.5 text-white rounded-full shadow-md hover:bg-gray-600 transition-colors duration-300"
      >
        ×
      </button>

      {/* Create Blog Form */}
      <form
        onSubmit={createBlog}
        className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg space-y-4"
      >

        <h2 className="text-3xl font-bold text-center mb-4">
          Create Blog
        </h2>

        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-1 text-gray-300"
          >
            Title
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col">
          <label
            htmlFor="subtitle"
            className="mb-1 text-gray-300"
          >
            Subtitle
          </label>

          <input
            type="text"
            name="subtitle"
            id="subtitle"
            placeholder="Enter blog subtitle"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 text-gray-300"
          >
            Description
          </label>

          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter blog description"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label
            htmlFor="url"
            className="mb-1 text-gray-300"
          >
            Image URL
          </label>

          <input
            type="text"
            name="url"
            id="url"
            placeholder="Enter image URL"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label
            htmlFor="author"
            className="mb-1 text-gray-300"
          >
            Author
          </label>

          <input
            type="text"
            name="author"
            id="author"
            placeholder="Enter author name"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Paragraph */}
        <div className="flex flex-col">
          <label
            htmlFor="paragraph"
            className="mb-1 text-gray-300"
          >
            Paragraph
          </label>

          <textarea
            name="paragraph"
            id="paragraph"
            rows="6"
            placeholder="Write your blog here..."
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold transition duration-200"
        >
          Create Blog
        </button>

      </form>
    </div>
  );
};

export default Create;

