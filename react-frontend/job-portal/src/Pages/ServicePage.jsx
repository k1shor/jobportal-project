import React from "react";
import { FaBriefcase, FaUserTie, FaLaptopCode, FaChartLine, FaClipboardCheck, FaUsers } from "react-icons/fa";

const services = [
  {
    icon: <FaBriefcase className="text-red-400 text-5xl" />,
    title: "Job Listings",
    description: "Browse thousands of job opportunities from top companies worldwide, tailored to your skills."
  },
  {
    icon: <FaUserTie className="text-red-400 text-5xl" />,
    title: "Career Guidance",
    description: "Get expert career advice, resume-building tips, and interview coaching to land your dream job."
  },
  {
    icon: <FaLaptopCode className="text-red-400 text-5xl" />,
    title: "Skill Development",
    description: "Access online courses and training programs to enhance your skills and employability."
  },
  {
    icon: <FaChartLine className="text-red-400 text-5xl" />,
    title: "Internship Programs",
    description: "Find the best internship opportunities to gain practical experience and kickstart your career."
  },
  {
    icon: <FaClipboardCheck className="text-red-400 text-5xl" />,
    title: "Recruitment Solutions",
    description: "Employers can streamline hiring with our advanced recruitment and candidate screening tools."
  },
  {
    icon: <FaUsers className="text-red-400 text-5xl" />,
    title: "Networking Events",
    description: "Join exclusive job fairs, networking events, and webinars to connect with industry professionals."
  }
];

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Service Page Header */}
        <h2 className="text-4xl font-bold text-red-400 mb-6">Our Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explore our wide range of services designed to help job seekers and employers find the perfect match.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ServicePage;
