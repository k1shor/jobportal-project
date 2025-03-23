import React from "react";
import { FaBriefcase, FaUserTie, FaLaptopCode, FaChartLine, FaClipboardCheck, FaUsers } from "react-icons/fa";

const services = [
  {
    icon: <FaBriefcase className="text-5xl text-red-400" />,
    title: "Job Listings",
    description: "Browse thousands of job opportunities from top companies worldwide, tailored to your skills."
  },
  {
    icon: <FaUserTie className="text-5xl text-red-400" />,
    title: "Career Guidance",
    description: "Get expert career advice, resume-building tips, and interview coaching to land your dream job."
  },
  {
    icon: <FaLaptopCode className="text-5xl text-red-400" />,
    title: "Skill Development",
    description: "Access online courses and training programs to enhance your skills and employability."
  },
  {
    icon: <FaChartLine className="text-5xl text-red-400" />,
    title: "Internship Programs",
    description: "Find the best internship opportunities to gain practical experience and kickstart your career."
  },
  {
    icon: <FaClipboardCheck className="text-5xl text-red-400" />,
    title: "Recruitment Solutions",
    description: "Employers can streamline hiring with our advanced recruitment and candidate screening tools."
  },
  {
    icon: <FaUsers className="text-5xl text-red-400" />,
    title: "Networking Events",
    description: "Join exclusive job fairs, networking events, and webinars to connect with industry professionals."
  }
];

const ServicePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="text-center lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Service Page Header */}
        <h2 className="text-4xl text-red-400 font-bold mb-6">Our Services</h2>
        <p className="text-gray-600 text-lg mb-12">
          Explore our wide range of services designed to help job seekers and employers find the perfect match.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg duration-300 hover:scale-105 hover:shadow-xl transform transition-all">
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-2xl text-gray-800 font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ServicePage;
