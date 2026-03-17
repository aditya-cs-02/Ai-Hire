import React, { useState } from "react";

const savedJobsData = [
  { id: 1, title: "Frontend Developer", company: "Company A", link: "/job/1" },
  { id: 2, title: "Backend Developer", company: "Company B", link: "/job/2" },
];

const appliedJobsData = [
  { id: 1, title: "Frontend Developer", company: "Company A", status: "Applied" },
  { id: 2, title: "Backend Developer", company: "Company B", status: "Interview Scheduled" },
  { id: 3, title: "Full Stack Developer", company: "Company C", status: "Hired" },
];

const Sidebar = () => (
  <div className="w-1/5 bg-gray-800 text-white h-screen p-4 hidden md:block fixed left-0 top-0">
    <h2 className="text-xl font-bold">Dashboard</h2>
    {/* Sidebar Content Here */}
  </div>
);

const SavedJobs = ({ jobs, onRemove }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Saved Jobs (💾)</h2>
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="p-4 border-b flex justify-between">
          <div>
            <h4 className="font-semibold text-lg">{job.title}</h4>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={job.link} className="text-blue-500">Apply</a>
            <button className="text-red-500" onClick={() => onRemove(job.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AppliedJobs = ({ jobs, onFollowUp }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mt-6">
    <h2 className="text-2xl font-bold mb-6">Applied Jobs (📌)</h2>
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="p-4 border-b flex justify-between">
          <div>
            <h4 className="font-semibold text-lg">{job.title}</h4>
            <p className="text-sm text-gray-500">{job.company}</p>
            <span className={`status-tag ${job.status.toLowerCase()}`}>{job.status}</span>
          </div>
          {job.status !== "Hired" && (
            <button className="text-green-500" onClick={() => onFollowUp(job.id)}>Follow Up</button>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ApplicationPage = () => {
  const [savedJobs, setSavedJobs] = useState(savedJobsData);
  const [appliedJobs, setAppliedJobs] = useState(appliedJobsData);

  const removeSavedJob = (id) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const followUpJob = (id) => {
    alert(`Follow-up email sent for job ID: ${id}`);
  };

  return (
    <div className="flex mt-10">
     
      <div className="w-full md:w-4/5 ml-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Application Dashboard</h1>
        <SavedJobs jobs={savedJobs} onRemove={removeSavedJob} />
        <AppliedJobs jobs={appliedJobs} onFollowUp={followUpJob} />
      </div>
    </div>
  );
};

export default ApplicationPage;