import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Hero = () => {
  const id = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    let isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logOut = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("userId", null);
    localStorage.setItem("email", null);
    setIsLoggedIn(false);
    setShowInfo(false);
    toast.success("Logged out!");
  };

  const toggleSidebarFn = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Close user info popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    }

    if (showInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfo]);

  return (
    <div>
      <div className="bg-gray-800 min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8 mx-[6vw]"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Blogs</span>
                <h1 className="text-2xl font-semibold text-white">Rubi</h1>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={toggleSidebarFn}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="w-6 h-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link to="#" className="text-sm/6 font-semibold text-white">
                Blogs
              </Link>
              {isLoggedIn ? (
                <Link
                  to="/create"
                  className="text-sm/6 font-semibold text-white"
                >
                  Create Blogs
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="text-sm/6 font-semibold text-white"
                >
                  Create Blogs
                </Link>
              )}
              <Link
                to="/learning-use-state"
                className="text-sm/6 font-semibold text-white"
              >
                Learn More
              </Link>
              <Link to="#" className="text-sm/6 font-semibold text-white">
                Company
              </Link>
            </div>
            {!isLoggedIn && (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  to="/signin"
                  className="text-sm/6 font-semibold text-white"
                >
                  Log in <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <div className="relative hidden lg:flex lg:flex-1 lg:justify-end">
                <button
                  onClick={toggleInfo}
                  className="text-sm/6 font-semibold text-white focus:outline-none"
                >
                  <img
                    className="w-[30px] h-[30px] rounded-full"
                    src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
                    alt="User Avatar"
                  />
                </button>
                {showInfo && (
                  <div
                    ref={infoRef}
                    className="absolute p-1 right-0 mt-2 w-56 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50"
                  >
                    <p
                      onClick={toggleInfo}
                      className=" text-xl cursor-pointer rounded-full absolute top-0.5 right-1.5"
                    >
                      x
                    </p>
                    <p className="text-sm text-gray-200">
                      <span className="font-bold">Email:</span> {email}
                    </p>
                    <p className="text-sm text-gray-200 mt-1">
                      <span className="font-bold">ID:</span> {id}
                    </p>
                    <button
                      onClick={logOut}
                      className="mt-3 w-full text-left text-gray-300 hover:text-gray-400"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Sidebar */}
          {toggleSidebar && (
            <div role="dialog" aria-modal="true" className="lg:hidden">
              <div className="fixed inset-0 z-50 bg-black/50" />
              <div className="fixed inset-y-0 right-0 z-50 bg-gray-800 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <h1 className="-mx-3 block rounded-lg px-3 py-2 text-xl font-semibold text-white hover:bg-gray-50"></h1>
                  </a>
                  <button
                    type="button"
                    onClick={toggleSidebarFn}
                    className="-m-2.5 rounded-md p-2.5 text-white"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        d="M6 18 18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-white/10">
                    <div className="space-y-2 py-6">
                      <Link
                        to="#blogg"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                      >
                        Blogs
                      </Link>
                      {isLoggedIn ? (
                        <Link
                          to="/create"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        >
                          Create Blogs
                        </Link>
                      ) : (
                        <Link
                          to="/signin"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                        >
                          Create Blogs
                        </Link>
                      )}
                      <Link
                        to="/learning-use-state"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                      >
                        Learning Use State
                      </Link>
                      <Link
                        to="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                      >
                        Company
                      </Link>
                    </div>
                    <div className="py-6">
                      {!isLoggedIn && (
                        <div className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50">
                          <Link
                            to="/signin"
                            className="text-sm/6 font-semibold text-white"
                          >
                            Log in <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      )}
                      {isLoggedIn && (
                        <div className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50">
                          <button onClick={toggleInfo}>
                            <img
                              className="w-[30px] h-[30px] rounded-full"
                              src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
                              alt="User Avatar"
                            />
                          </button>
                          {showInfo && (
                            <div
                              ref={infoRef}
                              className="absolute left-1.5 mt-2 w-56 bg-gray-700 text-white rounded-lg shadow-lg p-4 z-50"
                            >
                              <p
                                onClick={toggleInfo}
                                className=" text-xl cursor-pointer rounded-full absolute top-0.5 right-1.5"
                              >
                                x
                              </p>
                              <p className="text-sm text-gray-200">
                                <span className="font-bold">Email:</span>{" "}
                                {email}
                              </p>
                              <p className="text-sm text-gray-200 mt-1">
                                <span className="font-bold">ID:</span> {id}
                              </p>
                              <button
                                onClick={logOut}
                                className="mt-3 w-full text-left text-gray-300 hover:text-gray-400"
                              >
                                Log Out
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main hero content */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-22 sm:py-32 lg:py-38">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                "Stories That Inspire, Ideas That Matter."
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
                Dive into curated thoughts, personal journeys, and practical
                insights — all in one place. Whether you're here to learn,
                explore, or just read something beautiful, welcome to your next
                favorite blog.
              </p>
              {!isLoggedIn && (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/signin"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link
                    to="#"
                    className="text-sm/6 font-semibold text-gray-100"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
