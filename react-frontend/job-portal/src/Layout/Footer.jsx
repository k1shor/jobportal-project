import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBook, FaFileAlt, FaBriefcase, FaUserShield, FaNewspaper } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      {/* Footer Top Section */}
      <div className="flex flex-wrap bg-slate-200 justify-between gap-8 items-start md:px-20 px-8 py-10">
        
        {/* Quick Links Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li><Link to="/about" className="flex gap-2 hover:text-red-400 items-center"><FaBook /> About Us</Link></li>
            <li><Link to="/services" className="flex gap-2 hover:text-red-400 items-center"><FaNewspaper /> Our Services</Link></li>
            <li><Link to="/jobs" className="flex gap-2 hover:text-red-400 items-center"><FaBriefcase /> Browse Jobs</Link></li>
            <li><Link to="/contact" className="flex gap-2 hover:text-red-400 items-center"><FaPhoneAlt /> Contact Us</Link></li>
            <li><Link to="/terms" className="flex gap-2 hover:text-red-400 items-center"><FaFileAlt /> Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="flex gap-2 hover:text-red-400 items-center"><FaUserShield /> Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li><Link to="#" className="flex gap-2 hover:text-red-400 items-center"><FaFacebookF /> Facebook</Link></li>
            <li><Link to="#" className="flex gap-2 hover:text-red-400 items-center"><FaInstagram /> Instagram</Link></li>
            <li><Link to="#" className="flex gap-2 hover:text-red-400 items-center"><FaLinkedinIn /> LinkedIn</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="w-full md:w-2/5">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Sign Up for Job Alerts</h3>
          <p className="text-gray-600 text-sm mb-4">
            Stay updated with the latest job openings and career trends. Subscribe to our newsletter!
          </p>
          <div className="flex flex-col gap-3 items-center md:flex-row">
            <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-400 px-4 py-2" />
            <button className="bg-red-400 rounded-md text-white hover:bg-red-500 px-6 py-2 transition">Subscribe</button>
          </div>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className="bg-red-400 text-center text-sm text-white py-4">
        &copy; {new Date().getFullYear()} Index IT Hub. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
