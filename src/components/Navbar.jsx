import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );


  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("storage"));
    setShowMenu(false);
    navigate("/");
  };

  const isSignInPage = location.pathname === "/signin";

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" ? "bg-light" : "bg-white"
        }`}
    >
      <Link to={"/"}>
        <h1
          className="text-2xl font-bold leading-none tracking-tight md:text-3xl lg:text-4xl"
          style={{ color: "#0284c4" }}
        >
          CarRental
        </h1>
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"
          } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <ThemeToggle />
          <button
            onClick={() => navigate("/owner")}
            className="cursor-pointer"
          >
            Admin
          </button>

          {!isSignInPage && (
            loggedInUser ? (
              <div className="flex items-center gap-4 relative">
                <span className="font-medium"></span>
                <div className="relative">
                  <img
                    src={assets.user_iconn

                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu((prev) => !prev);
                    }}
                  />

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">

                      <button

                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-500"
                      >
                        {loggedInUser.username}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>

                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg"
              >
                Sign In
              </button>
            )
          )}
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
        />
      </button>
    </div>
  );
};

export default Navbar;
