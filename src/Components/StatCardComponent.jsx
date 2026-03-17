import React from 'react'

function StatCardComponent() {
  return (
    <main className="p-6">
    <h1 className="text-3xl font-bold">Welcome Back, John!</h1>

    {/* Job Stats */}
    <div className="grid grid-cols-3 gap-4 mt-6">
      <StatCard title="Total Applied" value="10" icon={<FaRocket />} />
      <StatCard title="Interviews Scheduled" value="2" icon={<FaCalendar />} />
      <StatCard title="Responses Received" value="5" icon={<FaEnvelope />} />
    </div>

    {/* AI Job Suggestions */}
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">AI-Powered Job Suggestions</h2>
      <div className="grid grid-cols-3 gap-4">
        <JobCard title="Frontend Developer" company="Google" location="Remote" />
        <JobCard title="Backend Developer" company="Amazon" location="USA" />
        <JobCard title="Full-Stack Developer" company="Microsoft" location="Hybrid" />
      </div>
    </section>
  </main>
  )
}

export default StatCardComponent