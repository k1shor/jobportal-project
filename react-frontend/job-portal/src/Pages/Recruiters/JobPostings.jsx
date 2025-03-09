// JobPostings.js
import React from 'react';

const JobPostings = () => {
  const jobPostings = [
    { id: 1, title: 'Software Engineer', location: 'Remote', status: 'Active' },
    { id: 2, title: 'Product Manager', location: 'New York', status: 'Active' },
    { id: 3, title: 'UI/UX Designer', location: 'San Francisco', status: 'Closed' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Job Postings</h1>
      <div className="mt-8">
        <button className="px-4 py-2 bg-red-400 text-white rounded-md mb-4 hover:bg-red-500">
          Add New Job Posting
        </button>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.location}</td>
                <td className="px-4 py-2">{job.status}</td>
                <td className="px-4 py-2">
                  <button className="px-2 py-1 bg-blue-400 text-white rounded-md mr-2 hover:bg-blue-500">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500">
                    Delete
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

export default JobPostings;
