import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const jobData = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York, USA", type: "Full-Time" },
  { id: 2, title: "Backend Developer", company: "CodeHouse", location: "San Francisco, USA", type: "Part-Time" },
  { id: 3, title: "UI/UX Designer", company: "DesignPro", location: "London, UK", type: "Remote" },
  { id: 4, title: "Project Manager", company: "AgileSoft", location: "Berlin, Germany", type: "Full-Time" },
];

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobData);
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-4xl font-bold text-red-400 mb-6'>Job Listings</h2>
        <p className='text-gray-600 mb-12'>Explore the latest job opportunities from top companies.</p>
        <div className='grid md:grid-cols-2 gap-6'>
          {jobs.map((job) => (
            <div key={job.id} className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition'>
              <h3 className='text-xl font-semibold text-gray-800'>{job.title}</h3>
              <p className='text-gray-600'>{job.company} - {job.location}</p>
              <span className='text-sm text-red-400 font-medium'>{job.type}</span>
              <Link 
                to={`/jobs/${job.id}`} 
                className='block mt-4 text-red-400 hover:underline'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;