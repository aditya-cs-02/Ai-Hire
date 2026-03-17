import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For stars and arrows

export default function TestimonialsComponent() {
  const testimonials = [
    {
      name: "Amit Sharma",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      quote: "This app helped me land my dream job in just a few weeks! The AI-driven filtering is amazing.",
    },
    {
      name: "Priya Desai",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      quote: "Super easy to use! I extracted HR emails effortlessly and got quick responses.",
    },
    {
      name: "Rahul Verma",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      quote: "I love the automation feature! It saved me hours of manual job applications.",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const carouselVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            Hear from job seekers who landed their dream jobs with AI.
          </p>
        </motion.div>

        {/* Testimonials Grid - Desktop View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border-t-4 border-indigo-500"
            >
              <div className="relative w-20 h-20 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover shadow-md"
                />
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 mt-3 text-sm md:text-base px-2">
                "{testimonial.quote}"
              </p>
              <div className="flex mt-4 text-yellow-400">
                {Array(testimonial.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} className="w-5 h-5" />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel - Mobile View */}
        <div className="md:hidden flex flex-col items-center mt-10">
          <motion.div
            key={current}
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center text-center border-t-4 border-indigo-500"
          >
            <div className="relative w-20 h-20 mb-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-full h-full rounded-full object-cover shadow-md"
              />
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {current + 1}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {testimonials[current].name}
            </h3>
            <p className="text-gray-600 mt-3 text-sm px-2">
              "{testimonials[current].quote}"
            </p>
            <div className="flex mt-4 text-yellow-400">
              {Array(testimonials[current].rating)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} className="w-5 h-5" />
                ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex mt-6 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-700 transition-transform transform hover:scale-110"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-700 transition-transform transform hover:scale-110"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}