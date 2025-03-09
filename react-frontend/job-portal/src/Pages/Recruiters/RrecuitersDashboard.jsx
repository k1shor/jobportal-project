// Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Job Postings</h3>
          <p className="mt-2 text-gray-600">5 active job postings</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Applications</h3>
          <p className="mt-2 text-gray-600">120 new applications</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700">Candidates</h3>
          <p className="mt-2 text-gray-600">45 candidates interviewed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
