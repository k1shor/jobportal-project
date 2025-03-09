import React from "react";
import { FaBriefcase, FaUserTie, FaLaptopCode } from "react-icons/fa";

const services = [
  {
    icon: <FaBriefcase className="text-red-400 text-5xl" />,
    title: "Job Listings",
    description: "Browse thousands of job opportunities from top companies worldwide."
  },
  {
    icon: <FaUserTie className="text-red-400 text-5xl" />,
    title: "Career Guidance",
    description: "Get expert career advice and resume-building tips to land your dream job."
  },
  {
    icon: <FaLaptopCode className="text-red-400 text-5xl" />,
    title: "Skill Development",
    description: "Access online courses and training to enhance your skills and employability."
  }
];

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-red-400 mb-6">Our Services</h2>
        <p className="text-gray-600 mb-12">
          Explore our range of services designed to help job seekers and professionals.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
