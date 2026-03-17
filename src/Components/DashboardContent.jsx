import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient'; // Import the API client
import { motion } from 'framer-motion'; // For animations

function DashboardContent() {
  const [stats, setStats] = useState({
    totalApplications: 120,
    jobsFound: 45,
    emailsSent: 30,
  });
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [userName, setUserName] = useState(''); // State for user's name
  const [loading, setLoading] = useState(true);

  // Dummy data for job suggestions (replace with API call later)
  const dummyJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Remote",
      type: "Full-time",
      matchScore: 92,
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Spotify",
      location: "New York, NY",
      type: "Full-time",
      matchScore: 88,
      postedDate: "3 days ago",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Part-time",
      matchScore: 85,
      postedDate: "1 day ago",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Microsoft",
      location: "Remote",
      type: "Full-time",
      matchScore: 90,
      postedDate: "4 days ago",
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch user data from /users/me
        const userResponse = await apiClient.get('/users/me');
        const userData = userResponse.data.user;
        setUserName(userData.fullname || 'User'); // Fallback to 'User' if fullname is not available

        // Simulate fetching dashboard data (replace with real API call)
        // const dashboardResponse = await apiClient.get('/dashboard');
        // setStats(dashboardResponse.data.stats);
        // setJobSuggestions(dashboardResponse.data.jobSuggestions);

        // Using dummy data for job suggestions for now
        setJobSuggestions(dummyJobs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setUserName('User'); // Fallback in case of error
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const jobCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="md:flex md:justify-center md:w-full md:my-16 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:ml-[20%] py-8 md:py-12 md:max-w-6xl w-full px-4 md:px-0">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome Back, {userName}!
          </h2>
          <p className="text-gray-600 mt-2">
            Explore your job opportunities and track your progress.
          </p>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold">Total Applications</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
            <p className="text-sm mt-1 opacity-80">Last 30 days</p>
          </motion.div>
          <motion.div
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold">Jobs Found</h3>
            <p className="text-3xl font-bold mt-2">{stats.jobsFound}</p>
            <p className="text-sm mt-1 opacity-80">Matching your profile</p>
          </motion.div>
          <motion.div
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold">Emails Sent</h3>
            <p className="text-3xl font-bold mt-2">{stats.emailsSent}</p>
            <p className="text-sm mt-1 opacity-80">Applications submitted</p>
          </motion.div>
        </div>

        {/* Job Suggestions */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            AI-Powered Job Suggestions
          </h3>
          {loading ? (
            <div className="text-center text-gray-600">Loading suggestions...</div>
          ) : jobSuggestions.length === 0 ? (
            <div className="text-center text-gray-600">No suggestions available.</div>
          ) : (
            jobSuggestions.map((job) => (
              <motion.div
                key={job.id}
                variants={jobCardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {job.title} - {job.company}
                  </p>
                  <p className="text-gray-600 mt-1">
                    {job.location} | {job.type}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600 font-medium">
                      Match Score: {job.matchScore}%
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      Posted: {job.postedDate}
                    </span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-transform transform hover:scale-105">
                  Apply Now
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-xl shadow-md hover:bg-blue-50 transition-colors">
              <span className="text-lg font-semibold text-blue-600">Upload Resume</span>
              <p className="text-gray-600">Improve your job matches</p>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-md hover:bg-green-50 transition-colors">
              <span className="text-lg font-semibold text-green-600">Search Jobs</span>
              <p className="text-gray-600">Find your next opportunity</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;