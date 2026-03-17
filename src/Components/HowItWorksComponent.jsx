import React from 'react';
import { FaSearch, FaEnvelope, FaRocket } from 'react-icons/fa'; // Using react-icons instead of emojis
import { motion } from 'framer-motion'; // For animations

export default function HowItWorksComponent() {
  const steps = [
    {
      icon: <FaSearch className="text-blue-600" />,
      step: "1",
      title: "Search & Filter Jobs",
      description: "Use advanced filters to find the most relevant job postings.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: <FaEnvelope className="text-green-600" />,
      step: "2",
      title: "Extract HR Emails",
      description: "Automatically collect recruiter contact information from job listings.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: <FaRocket className="text-orange-500" />,
      step: "3",
      title: "Apply & Automate Outreach",
      description: "Send AI-generated, personalized applications instantly.",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            Follow these 3 simple steps to land your dream job faster.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-${step.gradient.split(' ')[0].replace('from-', '')}`}
            >
              <div className={`relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${step.gradient} text-white mb-4 shadow-md`}>
                {step.icon}
                <span className="absolute top-0 right-0 bg-white text-gray-800 font-bold text-xs md:text-sm w-6 h-6 rounded-full flex items-center justify-center shadow">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-2">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm md:text-base px-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}