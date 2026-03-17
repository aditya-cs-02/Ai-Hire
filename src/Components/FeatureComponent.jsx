import React from 'react';
import { FaSearch, FaBrain } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa"; // Added LinkedIn icon
import { motion } from 'framer-motion'; // For animations

export default function FeatureComponent() {
  const features = [
    {
      icon: <FaSearch className="text-blue-600" />,
      title: "Smart Job Filtering",
      description: "Find relevant jobs based on your skills, experience, and preferences.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <CiMail className="text-green-600" />,
      title: "HR Email Extraction",
      description: "Instantly extract recruiter contact details from job listings.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <BsFillLightningChargeFill className="text-yellow-500" />,
      title: "Automated Outreach",
      description: "Auto-send AI-generated job applications to HRs & recruiters.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <GoGraph className="text-purple-600" />,
      title: "Job Tracking Dashboard",
      description: "Monitor your applications, responses, and follow-ups in real-time.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaBrain className="text-red-600" />,
      title: "AI Resume Optimization",
      description: "Improve your resume using AI-driven insights.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <FaLinkedin className="text-blue-700" />,
      title: "Seamless LinkedIn Integration",
      description: "Apply for jobs with one click, directly from LinkedIn.",
      gradient: "from-blue-600 to-cyan-500",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            Unlock your dream job faster with our AI-powered platform designed for job seekers.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-${feature.gradient.split(' ')[0].replace('from-', '')}`}
            >
              <div className={`text-4xl md:text-5xl p-4 rounded-full bg-gradient-to-r ${feature.gradient} text-white mb-4 shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm md:text-base px-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}