import React, { useState } from "react";
import apiClient from '../../api/apiClient';

const ResumeAnalyzePage = () => {
  const [file, setFile] = useState(null);
  const [jobProfile, setJobProfile] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobProfile || !experienceLevel) {
      alert("Please upload a resume, select a job profile, and choose an experience level.");
      return;
    }

    setIsLoading(true); // Show spinner
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobProfile", jobProfile);
    formData.append("experienceLevel", experienceLevel);

    try {
      const response = await apiClient.post('/ai-analysis/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for FormData
        },
      });

      const data = await response.data;
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        alert("Analysis failed: " + data.message);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("An error occurred during analysis.");
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Sidebar (20% width on medium and larger screens, hidden on mobile) */}
    

      {/* Main Content (80% width on medium and larger screens, full width on mobile) */}
      <div className="w-full md:ml-[10%] md:mt-[2%] mt-16 p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Resume Analyzer</h2>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Upload Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Job Profile</label>
              <input
                type="text"
                value={jobProfile}
                onChange={(e) => setJobProfile(e.target.value)}
                placeholder="e.g., Software Engineer"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Experience</option>
                <option value="entry">Entry</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* Analyze Button with Spinner */}
          <div className="flex justify-center mb-8">
            <button
              onClick={analyzeResume}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Your Resume"
              )}
            </button>
          </div>

          {/* Analysis Report (Displayed below the button) */}
          {analysis && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-md transition-all duration-300 ease-in-out animate-fadeIn">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Resume Analysis Report</h2>
                <p className="text-sm text-gray-500 mt-1">Generated for {file.name}</p>
              </div>

              {/* Score Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">ATS Score</h3>
                <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-6 rounded-full transition-all duration-500 ${
                      analysis.score >= 80 ? "bg-green-500" : analysis.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${analysis.score}%` }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm">
                      {analysis.score}/100
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {analysis.score >= 80
                    ? "Excellent ATS compatibility!"
                    : analysis.score >= 60
                    ? "Good, but room for improvement."
                    : "Needs significant updates for ATS."}
                </p>
              </div>

              {/* Missing Keywords */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Missing Keywords</h3>
                {analysis.missingKeywords.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-green-600 font-medium">No critical keywords missing!</p>
                )}
              </div>

              {/* Suggestions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Suggestions for Improvement</h3>
                <ul className="space-y-4">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="bg-blue-50 p-4 rounded-lg text-sm text-gray-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="font-medium text-blue-700">Suggestion {index + 1}:</span> {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition transform hover:scale-105"
                >
                  Close Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add animation for fade-in effect


export default ResumeAnalyzePage;