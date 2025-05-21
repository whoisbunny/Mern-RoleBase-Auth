import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import DarkModeContext from "./DarkModeContext";
import { toast } from "react-toastify";

const Header = () => {
  const { dark, setDark } = useContext(DarkModeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    toast.success("Logout successful");
    navigate("/");
  };
  const protectedUrl = "/home";
  const { pathname } = useLocation();

  const isAuthenticated = protectedUrl === pathname;

  return (
    <header
      className={`${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold hover:cursor-pointer">Logo</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {isAuthenticated && (
            <Link to="/home" className="hover:text-blue-500">
              Home
            </Link>
          )}
          {!isAuthenticated && pathname !== "/" && (
            <Link to="/" className="hover:text-blue-500">
              Customer Login
            </Link>
          )}
          {!isAuthenticated && pathname !== "/admin-login" && (
            <Link to="/admin-login" className="hover:text-blue-500">
              Admin Login
            </Link>
          )}
          {!isAuthenticated && pathname !== "/signup" && (
            <Link to="/signup" className="hover:text-blue-500">
              Sign Up
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={() => handleLogout()}
              className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-blue-500 hover:cursor-pointer"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => setDark(!dark)}
            className=" ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-yellow-500 hover:cursor-pointer"
          >
            {dark ? <Sun /> : <Moon />}{" "}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav
          className={`${
            dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } md:hidden px-4 pb-4`}
        >
          {/* <Link to={"/home"} className="block py-2 hover:text-blue-500">
            Home
          </Link> */}
          {isAuthenticated && (
            <Link to="/home" className="block hover:text-blue-500">
              Home
            </Link>
          )}
          {!isAuthenticated && pathname !== "/" && (
            <Link to="/" className="block hover:text-blue-500">
              Customer Login
            </Link>
          )}
          {!isAuthenticated && pathname !== "/admin-login" && (
            <Link to="/admin-login" className= "block hover:text-blue-500">
              Admin Login
            </Link>
          )}
          {!isAuthenticated && pathname !== "/signup" && (
            <Link to="/signup" className="block hover:text-blue-500">
              Sign Up
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={() => handleLogout()}
              className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-blue-500 hover:cursor-pointer"
            >
              Logout
            </button>
          )}
          {/* <button
            onClick={() => handleLogout()}
            className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-blue-500 hover:cursor-pointer"
          >
            Logout
          </button> */}
          <button
            onClick={() => setDark(!dark)}
            className="mt-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 w-full dark:text-gray-200 text-gray-700 hover:text-yellow-500 hover:cursor-pointer"
          >
            {dark ? "Light" : "Dark"} Mode
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
