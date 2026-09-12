import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  console.log(blog);

  return (
    <div>
      <Link to={`/single-page/${blog._id}`}>
        <div className="relative">
          <div className="block overflow-hidden group rounded-xl shadow-lg">
            <img
              src={blog.url}
              className="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110"
              alt={blog.title}
            />
          </div>

          <div className="relative mt-5">
            <p className="uppercase font-semibold text-xs mb-2.5 text-purple-600">
              {blog.author}
            </p>

            <div className="block mb-3 hover:underline">
              <h2 className="text-2xl font-bold mb-0.5 leading-5 text-black dark:text-white transition-colors duration-200 hover:text-purple-700 dark:hover:text-purple-400">
                {blog.title}
              </h2>
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {blog.subtitle}
            </p>

            <Link
              to={`/single-page/${blog._id}`}
              className="font-medium text-purple-600 dark:text-purple-400"
            >
              Read More
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;