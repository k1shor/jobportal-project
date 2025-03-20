import React, { useEffect, useState } from 'react';
import { getAllVacancies } from '../../api/vacancyAPI';

const JobListTable = ({ setJobUpdateForm, setSelectedJobId }) => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    getAllVacancies()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setJobPostings(data.data);
        }
      });
  }, []);

  const handleEditClick = (jobId) => e => {
    e.preventDefault()
    console.log((jobId))
    // Trigger the update form by passing jobId and showing the form
    setSelectedJobId(jobId);
    setJobUpdateForm(true);
  };

  return (
    <div>
      <h1 className="text-3xl text-gray-800 font-semibold">Job Postings</h1>
      <div className="mt-8">
        <table className="table-auto border border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Title</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Location</th>
              <th className="text-left px-4 py-2">Number</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Deadline</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.length > 0 &&
              jobPostings.map((job) => (
                <tr key={job._id} className="border-b">
                  <td className="px-4 py-2">{job.title}</td>
                  <td className="px-4 py-2">{job.category}</td>
                  <td className="px-4 py-2">{job.location}</td>
                  <td className="px-4 py-2">{job.vacancies}</td>
                  <td className="px-4 py-2">{job.employmentType}</td>
                  <td className="px-4 py-2">{job.status === 1 ? "Active" : "Expired"}</td>
                  <td className="px-4 py-2">{job.deadline.toString().split('T')[0]}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={handleEditClick(job._id)}
                      className="bg-blue-400 rounded-md text-white hover:bg-blue-500 mr-2 px-2 py-1"
                    >
                      Edit
                    </button>
                    <button className="bg-red-400 rounded-md text-white hover:bg-red-500 px-2 py-1">
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

export default JobListTable;
