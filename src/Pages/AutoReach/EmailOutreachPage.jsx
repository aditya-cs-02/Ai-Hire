import React, { useState } from "react";
import { FaEye, FaPaperPlane, FaClock, FaRobot } from "react-icons/fa";
import jsPDF from "jspdf"; // For PDF generation
import { saveAs } from "file-saver"; // For file downloads
import apiClient from '../../api/apiClient';

const EmailOutreachPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [personalDetails, setPersonalDetails] = useState("");
  const [emailContent, setEmailContent] = useState(""); // Final saved content
  const [editableContent, setEditableContent] = useState(""); // Editable version
  const [previewMode, setPreviewMode] = useState(false);
  const [status, setStatus] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // For popup visibility
  const [isEditing, setIsEditing] = useState(true); // Toggle between edit and saved mode
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner

  // Generate cover letter by calling backend API
  const generateCoverLetter = async () => {
    setIsLoading(true); // Show spinner
    try {
      const detailsLines = personalDetails.split("\n").reduce((acc, line) => {
        const [key, value] = line.split(": ").map((item) => item.trim());
        if (key && value) acc[key.toLowerCase()] = value;
        return acc;
      }, {});

      const requestBody = {
        jobDescription,
        userDetails: Object.keys(detailsLines).length > 0 ? detailsLines : undefined,
      };

      const response = await apiClient.post('/cover-letter', requestBody);

      const data = response.data;
      if (data.success) {
        setEmailContent(data.coverLetter);
        setEditableContent(data.coverLetter); // Set editable content initially
        setIsEditing(true); // Start in edit mode
        setShowPopup(true);
      } else {
        alert("Failed to generate cover letter: " + data.message);
      }
    } catch (error) {
      console.error("Error fetching cover letter:", error);
      alert("An error occurred while generating the cover letter.");
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  // Handle content editing in the popup
  const handleContentChange = (e) => {
    setEditableContent(e.target.value);
  };

  // Save edits and switch to read-only mode
  const saveEdits = () => {
    setEmailContent(editableContent); // Save the edited content
    setIsEditing(false); // Switch to read-only mode
  };

  // Download as DOC
  const downloadAsDoc = () => {
    const blob = new Blob([emailContent], { type: "application/msword" });
    saveAs(blob, "cover_letter.doc");
  };

  // Download as PDF (A4 size)
  const downloadAsPdf = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });
    doc.setFontSize(12);
    doc.text(emailContent, 10, 10, { maxWidth: 190 }); // Use saved content
    doc.save("cover_letter.pdf");
  };

  // Handle email sending
  const sendEmail = () => {
    setStatus([...status, { email: emailContent, status: "Sent" }]);
    alert("Email Sent!");
  };

  // Handle scheduling email
  const scheduleEmail = () => {
    setStatus([...status, { email: emailContent, status: "Scheduled" }]);
    alert("Email Scheduled!");
  };

  return (
    <div className="flex justify-center md:ml-24 bg-gray-100 mt-16 md:h-screen">
      <div className="md:w-[80%] md:ml-[15%] max-w-4xl p-6 md:p-8">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">AI Cover Letter Generator</h2>

          {/* Input Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                rows="5"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">Personal Details</label>
              <textarea
                value={personalDetails}
                onChange={(e) => setPersonalDetails(e.target.value)}
                placeholder="e.g., Name: John Doe\nEmail: john.doe@example.com\nPhone: (555) 123-4567\nExperience: 3+ years in software development"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                rows="5"
              />
            </div>
          </div>

          {/* AI Cover Letter Generator with Spinner */}
          <div className="flex justify-center mb-8">
            <button
              onClick={generateCoverLetter}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaRobot /> Generate AI Cover Letter
                </span>
              )}
            </button>
          </div>

          {/* Loading Spinner (Overlay) */}
          {isLoading && (
            <div className="fixed inset-0 bg-white/15 bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400 text-lg font-semibold">Your cover letter is on the way</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition transform hover:scale-105"
            >
              <FaEye /> Preview
            </button>
          </div>

          {/* Preview Mode */}
          {previewMode && (
            <div className="mb-8 bg-gray-50 p-6 rounded-xl shadow-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Preview</h3>
              <div
                dangerouslySetInnerHTML={{ __html: emailContent }}
                className="bg-white p-4 rounded-lg shadow-inner text-sm text-gray-700"
              />
            </div>
          )}

          {/* Popup for Cover Letter */}
          {showPopup && (
            <div className="fixed inset-0 bg-white/15 bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
              <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] relative">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {isEditing ? (
                  <>
                    <textarea
                      value={editableContent}
                      onChange={handleContentChange}
                      className="w-full h-[60vh] text-sm font-sans border-none focus:outline-none resize-none whitespace-pre-wrap bg-gray-50 p-4 rounded-lg shadow-inner"
                      placeholder="Edit your cover letter here..."
                    />
                    <div className="flex gap-4 mt-4 justify-end">
                      <button
                        onClick={saveEdits}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
                      >
                        Save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <pre className="text-sm font-sans whitespace-pre-wrap p-4 bg-gray-50 rounded-lg shadow-inner">
                      {emailContent}
                    </pre>
                    <div className="mt-4 flex gap-4 justify-end">
                      <button
                        onClick={downloadAsDoc}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                      >
                        Download DOC
                      </button>
                      <button
                        onClick={downloadAsPdf}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition transform hover:scale-105"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Status Tracker (Commented out, but styled for consistency) */}
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Email Status Tracker</h3>
            {status.length > 0 ? (
              <ul className="bg-white shadow-lg rounded-lg p-4 space-y-4">
                {status.map((item, index) => (
                  <li key={index} className="border-b py-3 flex justify-between items-center">
                    <span className="text-gray-700 text-sm truncate max-w-xs">
                      {item.email.length > 50 ? item.email.substring(0, 50) + "..." : item.email}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        item.status === "Sent" ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No emails sent yet.</p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmailOutreachPage;