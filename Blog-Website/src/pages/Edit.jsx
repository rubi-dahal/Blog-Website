
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const checkIsUser = async () => {
      try {
        const response = await axios.get(
           `https://blog-website-0c9o.onrender.com/fetch-blogs/${id}` || `http://localhost:3000/fetch-blogs/${id}` 
        );

        const blog = response.data.data;

        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";

        if (!isAuthenticated) {
          console.log("Unauthenticated");
          navigate("/signin");
          return;
        }

        console.log("Blog to edit:", blog);

      } catch (error) {
        console.error(error);
        toast.error("Could not find blog");
        navigate("/");
      }
    };

    checkIsUser();
  }, [id, navigate]);

  // Edit blog
  const editBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rawDetails = Object.fromEntries(formData);

    // Remove empty fields
    const details = Object.fromEntries(
      Object.entries(rawDetails).filter(
        ([, value]) => value.trim() !== ""
      )
    );

    if (Object.keys(details).length === 0) {
      toast.warn(
        "No changes made. Please fill at least one field."
      );
      return;
    }

    try {
      const response = await axios.put(
        `https://blog-website-0c9o.onrender.com/edit-blog/${id}`,
        details
      );

      if (response.status === 200) {
        toast.success("Blog edited successfully");
        navigate(-1);
      }

    } catch (error) {
      console.error(error);
      toast.error("Blog edit failed");
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
        className="w-[40px] h-[40px] text-2xl absolute top-1.5 right-1.5 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300"
      >
        ×
      </button>

      {/* Form */}
      <form
        onSubmit={editBlog}
        className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg space-y-3"
      >

        <h2 className="text-3xl font-bold text-center mb-4">
          Edit Blog
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
            placeholder="Enter title"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            placeholder="Enter subtitle"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            placeholder="Enter description"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Image / URL */}
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
            placeholder="Enter author"
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            placeholder="Write your blog..."
            className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold transition duration-200"
        >
          Edit Blog
        </button>

      </form>
    </div>
  );
};

export default Edit;

