import React, { useState, useEffect } from "react";
import apiClient from '../../api/apiClient'; // Use the centralized API client
import { toast } from "react-toastify";

const SettingPage = () => {
  const [profile, setProfile] = useState(null); // Start with null to indicate loading
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(true);
  const [isSMSNotificationsEnabled, setIsSMSNotificationsEnabled] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(true); // Start with true since we're fetching data
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/users/me');
        setProfile(response.data.user || { fullname: "", email: "", phone: "", linkedinId: "" });
      } catch (err) {
        setError('Failed to load user data');
        toast.error('Failed to load user data');
        setProfile({ fullname: "", email: "", phone: "", linkedinId: "" }); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const toggleEdit = (field) => {
    setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    if (e.target.name === "newPassword") setNewPassword(e.target.value);
    if (e.target.name === "confirmPassword") setConfirmPassword(e.target.value);
  };

  const handleNotificationToggle = (e) => {
    const { name, checked } = e.target;
    if (name === "emailNotifications") setIsEmailNotificationsEnabled(checked);
    if (name === "smsNotifications") setIsSMSNotificationsEnabled(checked);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const updateData = {};
      Object.keys(editableFields).forEach(field => {
        if (editableFields[field] && profile[field]) {
          updateData[field] = profile[field];
        }
      });
      if (newPassword) updateData.password = newPassword;

      await apiClient.put('/users/settings', updateData);

      setEditableFields({});
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Profile data successfully updated!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update settings");
      toast.error(err.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "fullname", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "linkedinId", label: "LinkedIn" },
  ];

  // Show loading state until profile is fetched
  if (loading && !profile) {
    return <div className="text-center mt-16">Loading...</div>;
  }

  return (
    <div className="flex justify-center bg-gray-100 mt-16 md:h-screen">
      <div className="max-w-5xl md:ml-[22%] mx-auto p-6 md:p-8 md:w-[80%]">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Settings & Profile</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Profile Section */}
          <div className="mb-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
            {fields.map((field) => (
              <div key={field.name} className="relative flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-2 w-24">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={profile[field.name] || ""}
                  onChange={handleProfileChange}
                  disabled={!editableFields[field.name]}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    !editableFields[field.name] ? "bg-gray-100" : ""
                  }`}
                />
                <button
                  onClick={() => toggleEdit(field.name)}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  {editableFields[field.name] ? "Lock" : "Edit"}
                </button>
              </div>
            ))}
          </div>

          {/* Password Section */}
          <div className="mb-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h3>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Notification Settings Section */}
          <div className="mb-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={isEmailNotificationsEnabled}
                onChange={handleNotificationToggle}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="text-gray-700 text-lg">Email Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={isSMSNotificationsEnabled}
                onChange={handleNotificationToggle}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="text-gray-700 text-lg">SMS Notifications</span>
            </label>
          </div>

          {/* Subscription Plan Section */}
          <div className="mb-8 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Plan</h3>
            <p className="text-gray-700 text-lg">
              Current Plan: <span className="font-medium text-green-600">Premium</span>
            </p>
            <p className="text-gray-700 text-lg">
              Next Billing Date: <span className="font-medium text-blue-600">March 15, 2025</span>
            </p>
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105">
              Update Subscription
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg transition transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-700 hover:to-teal-700"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;