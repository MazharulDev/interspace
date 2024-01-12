"use client";
import Link from "next/link";
import "../../css/Navbar.css";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";

const Navbar = () => {
  const { userId } = getUserInfo() as any;
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-[10] backdrop-filter backdrop-blur-md bg-opacity-80">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-[#00674A]" href="/">
              <h2 className="text-2xl">Interspace</h2>
            </Link>
          </div>

          <div className="md:flex md:items-center ">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/packages"
                  >
                    Package
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/your-review"
                  >
                    Review
                  </Link>
                </li>
                {userId ? (
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/profile"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/login"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="block md:hidden" onClick={() => setOpen(!open)}>
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden min-h-[200px] md:pb-0 pb-12 absolute md:static bg-gray-100 md:z-[12] z-[12] left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in gap-6 text-sm ${
          open ? "top-0" : "top-[-490px]"
        }`}
      >
        <div className="flex justify-end px-6 py-5">
          <div className="block md:hidden" onClick={() => setOpen(!open)}>
            <button className="rounded bg-gray-200 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => setOpen(!open)}
            className="text-center flex flex-col gap-7 text-md"
          >
            <Link
              className="text-gray-500 transition hover:text-gray-500/75"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-gray-500 transition hover:text-gray-500/75"
              href="/packages"
            >
              Package
            </Link>
            <Link
              className="text-gray-500 transition hover:text-gray-500/75"
              href="/your-review"
            >
              Review
            </Link>
            {userId ? (
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/profile"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
