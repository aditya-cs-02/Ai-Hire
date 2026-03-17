import React, { useState, useEffect } from "react";
import { FaCopy, FaDownload } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import apiClient from '../../api/apiClient';

const HRExtractionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [emails, setEmails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch recommendations from API
  useEffect(() => {
    if (searchTerm.length > 2) {
      apiClient
        .get('/users/search', {
          params: {
            query: searchTerm,
            page: 1,
            limit: 5,
          },
        })
        .then((res) => {
          setSuggestions(res.data.hrDetails || []);
          setShowDropdown(true); // Show dropdown when searching
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
      setShowDropdown(false); // Hide dropdown if search term is cleared
    }
  }, [searchTerm]);

  // Fetch selected HR details
  const extractEmails = () => {
    if (!selectedSuggestion) return;
    axios
      .get(`http://localhost:3000/api/users/search?query=${selectedSuggestion}&page=1&limit=10`)
      .then((res) => setEmails(res.data.hrDetails || []))
      .catch(() => setEmails([]));
  };

  // Copy Email to Clipboard
  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied successfully");
  };

  // Export Data as JSON
  const exportAsJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(emails))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "hr_emails.json";
    link.click();
  };

  // Export Data as CSV
  const exportAsCsv = () => {
    const csvContent = [
      ["Recruiter Name", "Email", "Job Title", "Source"],
      ...emails.map((item) => [item.name, item.email, item.job, item.source]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hr_emails.csv";
    link.click();
  };

  return (
    <div className="flex justify-center bg-gray-100 mt-16 md:h-screen">
      <div className="max-w-5xl md:ml-[22%] mx-auto p-6 md:p-8 md:w-[80%]">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Extract HR Emails</h2>

          {/* Search and Extract Section */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="relative">
              <label className="block text-lg font-semibold mb-2 text-gray-700">Search HR Name or Company</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter HR Name or Company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {showDropdown && suggestions.length > 0 && (
                  <ul className="absolute top-20 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto z-10">
                    {suggestions.map((item) => (
                      <li
                        key={item.email}
                        onClick={() => {
                          setSelectedSuggestion(item.name);
                          setSearchTerm(item.name);
                          setShowDropdown(false); // Close dropdown only when selecting an item
                        }}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition"
                      >
                        <span className="font-medium text-gray-800">{item.name}</span> - <span className="text-gray-600">{item.company}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={extractEmails}
                disabled={!selectedSuggestion}
                className={`mt-4 w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
                  !selectedSuggestion ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                Extract Emails
              </button>
            </div>
          </div>

          {/* Email Cards */}
          {emails.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {emails.map((item) => (
                <div
                  key={item.email}
                  className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Email: {item.email}</p>
                  <p className="text-sm text-gray-600 mb-2">Job Title: {item.job}</p>
                  <p className="text-sm text-gray-600 mb-2">Source: {item.source}</p>
                  <button
                    onClick={() => copyToClipboard(item.email)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer flex items-center gap-1 transition"
                  >
                    <FaCopy className="inline-block mr-1" /> Copy Email
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Export Buttons */}
          {emails.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={exportAsJson}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                <FaDownload className="mr-2" /> Export JSON
              </button>
              <button
                onClick={exportAsCsv}
                className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition transform hover:scale-105"
              >
                <FaDownload className="mr-2" /> Export CSV
              </button>
            </div>
          )}

          {/* No Results Message */}
          {emails.length === 0 && selectedSuggestion && (
            <p className="text-gray-600 text-sm mt-4">No HR emails found for this search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRExtractionPage;