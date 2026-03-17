import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // Adjust path to your AuthContext

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const [seconds, setSeconds] = useState(4); // Countdown timer

  useEffect(() => {
    // Determine the previous route or fallback
    const previousRoute = location.state?.from || (isAuthenticated ? "/dashboard" : "/");

    // Countdown and redirect logic
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(previousRoute, { replace: true }); // Redirect after 4 seconds
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [navigate, location, isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p className="text-gray-500 mt-2">Redirecting in {seconds} seconds...</p>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to {isAuthenticated ? "Dashboard" : "Home"} Now
      </Link>
    </div>
  );
}