import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LearningUseState = () => {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCounter = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 text-white  p-4">
      <button
        onClick={goBack}
        className="w-[30px] h-[30px]  absolute top-5 right-5 text-amber-50 *:bg-black text-gray-800 dark:text-white rounded-full shadow-md hover:bg-amber-100 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        x
      </button>
      <h1 className="text-4xl md:text-6xl font-bold mb-8">React Counter</h1>

      <div className="dark:bg-gray-700 text-white rounded-full w-40 h-40 flex items-center justify-center text-6xl font-semibold shadow-xl mb-10">
        {count}
      </div>

      <div className="flex gap-6">
        <button
          onClick={decreaseCounter}
          className="bg-purple-900 hover:bg-purple-800 text-white text-3xl px-6 py-3 rounded-xl shadow-md transition-all duration-200"
        >
          -
        </button>
        <button
          onClick={increaseCounter}
          className="bg-pink-950 hover:bg-pink-900 text-white text-3xl px-6 py-3 rounded-xl shadow-md transition-all duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LearningUseState;
