import React from "react";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const aboutSections = [
  {
    icon: <FaBullseye className="text-red-400 text-5xl" />,
    title: "Our Mission",
    description:
      "At Index IT Hub, our mission is to bridge the gap between job seekers and employers by offering innovative and efficient job listing, recruitment tools, and skill development programs."
  },
  {
    icon: <FaLightbulb className="text-red-400 text-5xl" />,
    title: "Our Vision",
    description:
      "We aim to empower individuals and businesses by creating a seamless, user-friendly platform where job seekers find the right career opportunities, and employers find the best talent."
  }
];

const teamMembers = [
  {
    name: "John Doe",
    position: "Founder & CEO",
    image: "https://via.placeholder.com/150",
    description: "An experienced entrepreneur passionate about technology and innovation."
  },
  {
    name: "Jane Smith",
    position: "CTO",
    image: "https://via.placeholder.com/150",
    description: "Leads our technical team with expertise in software engineering and AI."
  },
  {
    name: "Michael Brown",
    position: "Head of HR",
    image: "https://via.placeholder.com/150",
    description: "Ensures a smooth hiring process and fosters a strong workplace culture."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* About Us Section */}
        <h2 className="text-4xl font-bold text-red-400 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 mb-12">
          Learn more about our job portal services, designed to help job seekers and employers find the best matches.
        </p>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {aboutSections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">{section.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800">{section.title}</h3>
              <p className="text-gray-600 mt-2">{section.description}</p>
            </div>
          ))}
        </div>

        {/* Meet Our Team Section */}
        <h2 className="text-4xl font-bold text-red-400 mb-6">Meet Our Team</h2>
        <p className="text-lg text-gray-600 mb-12">
          Our dedicated professionals work together to make job searching and recruitment seamless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-red-400 text-lg font-medium">{member.position}</p>
              <p className="text-gray-600 mt-2">{member.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
