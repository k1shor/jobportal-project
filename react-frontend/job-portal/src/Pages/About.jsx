import React from "react";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const aboutSections = [
  {
    icon: <FaBullseye className="text-5xl text-red-400" />,
    title: "Our Mission",
    description:
      "At Index IT Hub, our mission is to bridge the gap between job seekers and employers by offering innovative and efficient job listing, recruitment tools, and skill development programs."
  },
  {
    icon: <FaLightbulb className="text-5xl text-red-400" />,
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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="text-center lg:px-8 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* About Us Section */}
        <h2 className="text-4xl text-red-400 font-bold mb-6">About Us</h2>
        <p className="text-gray-600 text-lg mb-12">
          Learn more about our job portal services, designed to help job seekers and employers find the best matches.
        </p>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2">
          {aboutSections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg duration-300 hover:scale-105 hover:shadow-xl transform transition-all">
              <div className="flex justify-center mb-6">{section.icon}</div>
              <h3 className="text-2xl text-gray-800 font-semibold">{section.title}</h3>
              <p className="text-gray-600 mt-2">{section.description}</p>
            </div>
          ))}
        </div>

        {/* Meet Our Team Section */}
        <h2 className="text-4xl text-red-400 font-bold mb-6">Meet Our Team</h2>
        <p className="text-gray-600 text-lg mb-12">
          Our dedicated professionals work together to make job searching and recruitment seamless.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg duration-300 hover:scale-105 hover:shadow-xl transform transition-all">
              <img src={member.image} alt={member.name} className="h-32 rounded-full w-32 mb-4 mx-auto" />
              <h3 className="text-2xl text-gray-800 font-semibold">{member.name}</h3>
              <p className="text-lg text-red-400 font-medium">{member.position}</p>
              <p className="text-gray-600 mt-2">{member.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
