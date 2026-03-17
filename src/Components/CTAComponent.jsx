export default function CTAComponent() {
    return (
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-4xl font-bold">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-gray-200 mt-2">
            Start using AI-powered job hunting today!
          </p>
  
          {/* CTA Button */}
          <button className="mt-6 px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-md hover:bg-gray-200 transition">
            Sign Up for Free
          </button>
        </div>
      </section>
    );
  }
  