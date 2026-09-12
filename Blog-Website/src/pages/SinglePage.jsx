
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SinglePage = () => {
  const [isUser, setIsUser] = useState(false);
  const [blog, setBlog] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  // Fetch single blog
  const fetchBlogById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/fetch-blogs/${id}`
      );

      const blogData = response.data.data;

      console.log(blogData);

      setBlog(blogData);

      // Check if logged-in user is the author
      const userName = localStorage.getItem("userName");
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";

      if (
        blogData.author === userName &&
        isAuthenticated
      ) {
        setIsUser(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blog");
    }
  };

  // Delete blog
  const deleteBlog = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/delete-blogs/${id}`
      );

      toast.success("Blog Deleted!");

      goBack();
    } catch (error) {
      console.error(error);
      toast.error("Blog deletion failed");
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  return (
    <div className="relative">

      {/* Back Button */}
      <button
        type="button"
        onClick={goBack}
        className="w-[40px] h-[40px] text-2xl absolute top-1.5 right-1.5 text-white rounded-full shadow-md hover:bg-gray-600 transition-colors duration-300 z-10"
      >
        ×
      </button>

      {blog && (
        <div className="w-full min-h-screen bg-gray-800">

          <div className="w-full mx-auto py-10 bg-gray-800">

            {/* Blog Cover */}
            <img
              src={blog.url}
              alt={blog.title}
              className="xl:w-[80%] w-[96%] mx-auto lg:h-[560px] md:h-[480px] rounded-lg object-cover"
            />

            {/* Blog Info */}
            <div className="w-[95%] mx-auto flex md:gap-4 gap-2 justify-center items-center pt-4">

              <div className="flex gap-2 items-center">

                {/* Author */}
                <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {blog.author?.charAt(0).toUpperCase()}
                </div>

                <h2 className="text-sm font-semibold text-white">
                  {blog.author}
                </h2>

              </div>

              <div className="text-gray-500">
                |
              </div>

              <h3 className="text-sm font-semibold text-gray-400">
                Blog
              </h3>

              <div className="text-gray-500">
                |
              </div>

              <h4 className="text-sm font-semibold text-gray-400">
                5 MIN READ
              </h4>

            </div>

            {/* Blog Content */}
            <div className="py-6 bg-gray-800">

              <div className="md:w-[80%] w-[90%] mx-auto pt-4">

                {/* Title */}
                <h1 className="text-5xl text-white font-bold mt-3.5">
                  {blog.title}
                </h1>

                {/* Subtitle */}
                <h6 className="text-2xl text-gray-400 mt-5">
                  {blog.subtitle}
                </h6>

                {/* Description */}
                <p className="text-xl text-gray-500 mt-4">
                  {blog.description}
                </p>

                {/* Paragraph */}
                <p className="text-[17px] text-gray-400 mt-5 leading-8">
                  {blog.paragraph}
                </p>

              </div>

            </div>

            {/* Edit & Delete */}
            {isUser && (
              <div className="flex gap-3.5 justify-center">

                <Link to={`/edit/${id}`}>
                  <button
                    className="w-[100px] py-2 bg-gray-700 hover:bg-purple-800 text-white text-lg font-medium rounded transition duration-200 shadow-sm"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={deleteBlog}
                  className="w-[100px] py-2 bg-gray-700 hover:bg-red-700 text-white text-lg font-medium rounded transition duration-200 shadow-sm"
                >
                  Delete
                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;

