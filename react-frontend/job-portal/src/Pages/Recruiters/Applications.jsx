// Applications.js
import React from 'react';

const Applications = () => {
  const applications = [
    { id: 1, candidate: 'John Doe', job: 'Software Engineer', status: 'Pending' },
    { id: 2, candidate: 'Jane Smith', job: 'Product Manager', status: 'Reviewed' },
    { id: 3, candidate: 'Mark Lee', job: 'UI/UX Designer', status: 'Interviewed' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Applications</h1>
      <div className="mt-8">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Candidate</th>
              <th className="px-4 py-2 text-left">Job</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b">
                <td className="px-4 py-2">{app.candidate}</td>
                <td className="px-4 py-2">{app.job}</td>
                <td className="px-4 py-2">{app.status}</td>
                <td className="px-4 py-2">
                  <button className="px-2 py-1 bg-blue-400 text-white rounded-md mr-2 hover:bg-blue-500">
                    View
                  </button>
                  <button className="px-2 py-1 bg-green-400 text-white rounded-md mr-2 hover:bg-green-500">
                    Accept
                  </button>
                  <button className="px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
