import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust path as needed
import { toast } from "react-toastify";
import { FaHome, FaBriefcase, FaEnvelope, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa"; // Added icons for better visuals

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gradient-to-b from-gray-900 to-gray-800 w-64 p-6 shadow-xl z-50 md:translate-x-0 md:w-1/5 md:fixed md:flex md:flex-col md:h-full`}
    >
      <button
        className="absolute top-4 right-4 md:hidden text-white hover:text-gray-300 transition transform hover:scale-110"
        onClick={() => setSidebarOpen(false)}
      >
        <CiCircleRemove size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-8 text-white">Dashboard</h2>
      <div className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaHome className="text-lg" /> Home
        </Link>
        <Link
          to="/dashboard/jobs"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaBriefcase className="text-lg" /> Finding Jobs
        </Link>
        <Link
          to="/dashboard/hr"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaEnvelope className="text-lg" /> HR Email Finding
        </Link>
        <Link
          to="/dashboard/email-outreach"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaFileAlt className="text-lg" /> AI Cover Letter Generator
        </Link>
        <Link
          to="/dashboard/resume-analyze"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaFileAlt className="text-lg" /> AI Resume Analyze
        </Link>
        <Link
          to="/dashboard/setting"
          state={{ from: location.pathname }}
          className="p-4 bg-gray-700 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaCog className="text-lg" /> Profile Setting
        </Link>
        <button
          onClick={handleLogout}
          className=" p-4 bg-red-600 rounded-lg cursor-pointer hover:bg-red-700 transition-colors flex items-center gap-3 text-white hover:text-gray-200"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
}