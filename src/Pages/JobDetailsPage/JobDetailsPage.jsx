import React from "react";

const JobDetailsPage = () => {
  const job = {
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$80K - $100K",
    description: `We are looking for a skilled frontend developer with experience in React and Tailwind CSS. You will be responsible for building and maintaining user interfaces, ensuring a seamless user experience.`
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Company Banner & Job Info */}
      <div className="p-4 border rounded mb-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-600">{job.company} - {job.location}</p>
        <p className="text-green-600 font-semibold">{job.salary}</p>
      </div>

      {/* Job Description */}
      <div className="p-4 border rounded mb-6">
        <h2 className="text-xl font-bold mb-3">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      {/* Apply & Save Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded w-full md:w-auto">Apply Now</button>
        <button className="bg-gray-300 px-6 py-3 rounded w-full md:w-auto">Save for Later</button>
      </div>

      {/* Similar Jobs Section */}
      <div className="p-4 border rounded">
        <h2 className="text-xl font-bold mb-3">Similar Jobs</h2>
        <ul className="space-y-2">
          <li className="p-2 border rounded">Backend Developer - InnovateX</li>
          <li className="p-2 border rounded">UI/UX Designer - DesignHub</li>
        </ul>
      </div>

      {/* Sticky Apply Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md md:hidden">
        <button className="bg-blue-600 text-white px-6 py-3 rounded w-full">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
