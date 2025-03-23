import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your form submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-100 md:px-20 min-h-screen px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl text-red-400 font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 text-lg">
          Get in touch with us for any inquiries, support, or business opportunities.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column: Address and Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">Our Address</h3>
          <div className="mb-4">
            <div className="flex text-gray-600 items-center mb-2">
              <FaMapMarkerAlt className="text-red-400 mr-2" />
              <p>Index IT Hub, Kathmandu, Nepal</p>
            </div>
            <div className="flex text-gray-600 items-center mb-2">
              <FaPhoneAlt className="text-red-400 mr-2" />
              <p>+977 123-456-789</p>
            </div>
            <div className="flex text-gray-600 items-center">
              <FaEnvelope className="text-red-400 mr-2" />
              <p>info@indexithub.com</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-8">
            <h3 className="text-2xl text-gray-800 font-semibold mb-4">Our Location</h3>
            <div className="h-64 w-full">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0929397232747!2d85.3180246154478!3d27.717243832757177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18edce6acb97%3A0x6ee5f4a3e2a82a07!2sIndex%20IT%20Hub!5e0!3m2!1sen!2snp!4v1613513506007!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">Contact Form</h3>
          <p className="text-gray-600 mb-6">
            Fill out the form below, and our team will get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-600 block mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border p-3 rounded-md text-gray-700 w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-600 block mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border p-3 rounded-md text-gray-700 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-600 block mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="border p-3 rounded-md text-gray-700 w-full"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-400 rounded-md text-white w-full hover:bg-red-500 py-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
