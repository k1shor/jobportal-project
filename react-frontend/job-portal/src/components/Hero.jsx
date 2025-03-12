import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-red-300 text-white min-h-[90vh] flex items-center justify-center px-6 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-image.jpg')" }}
      ></div>
      {/* Darker overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative p-36 mx-auto bg-black/20">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Join Our Community Today!
        </h1>

        <p className="mt-4 text-lg">
          Register as a user or a company and unlock exciting features tailored just for you.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="/register"
            className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-red-500 transition-all duration-200 focus:ring-2 focus:ring-red-400"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="border border-gray-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-200 focus:ring-2 focus:ring-gray-400"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
