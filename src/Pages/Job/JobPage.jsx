import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaSearch, FaBookmark, FaArrowRight } from "react-icons/fa"; // Added icons for consistency
import axios from "axios";
import apiClient from '../../api/apiClient';

const JobPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Check if more jobs exist

  const observer = useRef();

  // **Fetch jobs from the backend**
  const fetchJobs = async (pageNumber = 1, isNewSearch = false) => {
    try {
      setLoading(true);

      const { data } = await apiClient.get('/users/jobs', {
        params: {
          page: pageNumber,
          search: searchTerm,
          location: locationFilter,
          type: jobTypeFilter,
          experience: experienceFilter,
        },
      });

      if (data.jobs.length === 0) {
        setHasMore(false); // No more jobs to fetch
      } else {
        setJobs((prevJobs) => (isNewSearch ? data.jobs : [...prevJobs, ...data.jobs])); // Reset if new search
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs when page changes
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // **Trigger search when filters change**
  const handleSearch = () => {
    setJobs([]); // Reset jobs list
    setPage(1); // Reset pagination
    setHasMore(true);
    fetchJobs(1, true); // Fetch fresh results
  };

  // **Load more jobs when scrolling reaches the bottom**
  const lastJobRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Load the next page
        }
      });

      if (node) observer.current.observe(node); // Observe last job card
    },
    [loading, hasMore]
  );

  return (
    <div className="flex justify-center bg-gray-100 mt-16 md:h-auto">
      <div className="max-w-5xl md:ml-[20%] mx-auto p-6 md:p-8 md:w-[80%]">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Job Listings</h2>

          {/* Search & Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
  <div className="relative w-full md:w-1/2">
    <input
      type="text"
      placeholder="Search job title or company..."
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
  <select
    className="border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition w-full md:w-1/6"
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
  >
    <option value="">Zone</option>
    <option value="in">India</option>
    <option value="us">USA</option>
    <option value="eu">Europe</option>
  </select>
  <select
    className="border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition w-full md:w-1/6"
    value={jobTypeFilter}
    onChange={(e) => setJobTypeFilter(e.target.value)}
  >
    <option value="">Job Type</option>
    <option value="On-site">On-site</option>
    <option value="Remote">Remote</option>
    <option value="Hybrid">Hybrid</option>
  </select>
  <select
    className="border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition w-full md:w-1/6"
    value={experienceFilter}
    onChange={(e) => setExperienceFilter(e.target.value)}
  >
    <option value="">Experience Level</option>
    <option value="Junior">Junior</option>
    <option value="Mid">Mid-Level</option>
    <option value="Senior">Senior</option>
  </select>
  <button
    onClick={handleSearch}
    className="bg-gradient-to-r flex items-center from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 w-full md:w-1/6"
  >
    <FaSearch className="inline-block mr-2" /> Search
  </button>
</div>

          {/* Job Listings Section */}
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  ref={index === jobs.length - 1 ? lastJobRef : null} // Observe last job card
                  className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">
                      {job.company} - {job.location || "Unknown Location"}
                    </p>
                    <p className="text-green-600 font-semibold mb-2">
                      {job.salaryPredicted || "Salary not disclosed"}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition transform hover:scale-105 flex items-center gap-2">
                      <FaBookmark className="text-gray-600" /> Save Job
                    </button>
                    <a
                      href={job.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105 flex items-center gap-2"
                    >
                      Apply <FaArrowRight />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 text-lg font-medium">No jobs found</p>
          )}

          {/* Loading Indicator */}
          {loading && (
            <p className="text-center text-gray-600 text-lg font-medium mt-4">Loading more jobs...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;