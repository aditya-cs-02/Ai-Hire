import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust path as needed
import { toast } from "react-toastify";
import { FaCog, FaSignOutAlt } from "react-icons/fa"; // Added icons for dropdown consistency

export default function Header({ isSidebarOpen, setSidebarOpen }) {
  const [isOpen, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logged out successfully");
    setOpen(false); // Close dropdown after logout
  };

  return (
    <header className="fixed w-full flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-xl z-10">
      <button
        className="md:hidden text-white hover:text-gray-300 transition transform hover:scale-110"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <RxHamburgerMenu size={24} />
      </button>
      <div className="flex justify-end flex-wrap-reverse px-4 md:w-full">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-2xl font-bold text-white hover:text-blue-300 transition">
            AIHire
          </Link>
          <IoIosNotifications
            size={24}
            className="text-white hover:text-gray-300 cursor-pointer transition transform hover:scale-110"
          />
          <RxAvatar
            size={24}
            className="text-white cursor-pointer hover:text-gray-300 transition transform hover:scale-110"
            onClick={() => setOpen(!isOpen)}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-y-14 right-0 bg-white shadow-2xl w-48 rounded-l-lg transition-transform duration-300 ease-in-out"
        >
          <div className="flex flex-col gap-2 p-4">
            <Link
              to="/dashboard/setting"
              className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2 text-gray-800 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              <FaCog className="text-lg" /> Profile Setting
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-sm bg-red-600 cursor-pointer text-white hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}