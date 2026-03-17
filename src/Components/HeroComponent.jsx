import Lottie from "lottie-react";
import jobAnimation from "../utilities/jobAnimation.json" // Add your Lottie JSON file here

export default function HeroComponent() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-[90vh] py-24 px-6 md:px-16 lg:px-32 lg:py-32 bg-gray-50">
      
      {/* Left Side: Text + CTA */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Find Your Dream Job Faster with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4">
          AI-powered job filtering, HR email extraction, and auto-apply.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 space-x-4 flex flex-col">
          <a href="/signup" className="bg-blue-600 text-white w-full md:w-1/2 text-center py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Get Started for Free
          </a>
          <button className="border md:w-1/2  border-gray-800 text-gray-800 px-6 py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Watch Demo
          </button>
        </div>

        {/* Trust Icons */}
        <p className="text-sm text-gray-500 mt-4">✅ Trusted by 10,000+ job seekers</p>
      </div>

      {/* Right Side: Animation */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <Lottie animationData={jobAnimation} className="max-w-sm md:max-w-md" />
      </div>

    </section>
  );
}
