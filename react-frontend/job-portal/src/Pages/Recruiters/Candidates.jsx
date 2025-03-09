// Candidates.js
import React from 'react';

const Candidates = () => {
  const candidates = [
    { id: 1, name: 'John Doe', job: 'Software Engineer', status: 'Interviewed' },
    { id: 2, name: 'Jane Smith', job: 'Product Manager', status: 'Pending' },
    { id: 3, name: 'Mark Lee', job: 'UI/UX Designer', status: 'Accepted' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Candidates</h1>
      <div className="mt-8">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Job</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="border-b">
                <td className="px-4 py-2">{candidate.name}</td>
                <td className="px-4 py-2">{candidate.job}</td>
                <td className="px-4 py-2">{candidate.status}</td>
                <td className="px-4 py-2">
                  <button className="px-2 py-1 bg-blue-400 text-white rounded-md mr-2 hover:bg-blue-500">
                    View Profile
                  </button>
                  <button className="px-2 py-1 bg-green-400 text-white rounded-md mr-2 hover:bg-green-500">
                    Shortlist
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

export default Candidates;
