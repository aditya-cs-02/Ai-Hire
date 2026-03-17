import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import apiClient from "../../api/apiClient";
import NavbarComponent from "../../Components/NavbarComponent";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google'; // Add Google Sign-In library

const AuthPage = ({ type }) => {
  const isSignIn = type === "signin";
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isSignIn ? "/users/signin" : "/users/signup";
      const payload = isSignIn
        ? { email: formData.email, password: formData.password }
        : {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
          };

      if (!isSignIn && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      const response = await apiClient.post(endpoint, payload);
      login(response.data.user, response.data.accessToken, response.data.refreshToken);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => navigate("/dashboard"),
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/users/google-auth', {
        idToken: credentialResponse.credential,
      });
      login(response.data.user, response.data.accessToken, response.data.refreshToken);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => navigate("/dashboard"),
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Google login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex min-h-screen items-center justify-center md:py-28 px-4 py-32 bg-gray-100">
        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {isSignIn ? "Welcome Back!" : "Create an Account"}
            </h1>
            <p className="text-gray-500 mt-2">
              {isSignIn
                ? "Sign in to continue your job search."
                : "Join thousands of job seekers using AI"}
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              )}

              {isSignIn && (
                <div className="flex justify-end text-sm">
                  <Link to="/forgot-password" className="text-blue-500">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? "Processing..."
                  : isSignIn
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-500 ">Or continue with</p>
              <div className="flex justify-center space-x-4 mt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    toast.error("Google login failed. Please try again.", {
                      position: "top-right",
                      autoClose: 3000,
                    });
                  }}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled || loading}
                      className="w-full px-auto  flex gap-2 items-center justify-center border py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      <FaGoogle className="text-red-500" />
                      Google
                    </button>
                  )}
                />
               
              </div>
            </div>

            <p className="mt-4 text-center text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                to={isSignIn ? "/signup" : "/login"}
                className="text-blue-500 font-semibold"
              >
                {isSignIn ? "Sign Up" : "Log In"}
              </Link>
            </p>
          </div>

          <div className="hidden md:flex w-1/2 md:border-l-4 md:border-amber-300 bg-gray-200 items-center justify-center">
            <img
              src="/auth.gif"
              alt="Authentication Illustration"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;