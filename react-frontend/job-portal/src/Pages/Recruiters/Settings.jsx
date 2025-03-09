// Settings.js
import React, { useState } from 'react';

const Settings = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission (e.g., API call)
    console.log('Settings saved:', formData);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">Account Settings</h1>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your password"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-lg font-medium text-gray-600">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your company"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 bg-red-400 text-white rounded-md font-semibold hover:bg-red-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </>
  );
};

export default Settings;
