import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVacancies } from '../api/vacancyAPI';
import { API } from '../config';



const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllVacancies()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }
      else{
        console.log(data)
        setJobs(data.data);

      }
    })
  }, []);

  return (
    <div className='bg-gray-100 p-8 min-h-screen'>
      <div className='text-center max-w-6xl mx-auto'>
        <h2 className='text-4xl text-red-400 font-bold mb-6'>Job Listings</h2>
        <p className='text-gray-600 mb-12'>Explore the latest job opportunities from top companies.</p>
        <div className='grid gap-6 lg:grid-cols-3 md:grid-cols-2'>
          {jobs.map((job) => (
            <div key={job._id} className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition'>
              <div className='flex h-40 justify-center shadow-lg items-center mb-5 overflow-hidden'>
              <img src={`${API}/${job.image}`} alt={job.image} className='w-full' />
              </div>
              <h3 className='text-gray-800 text-xl font-semibold'>{job.title}</h3>
              <p className='text-gray-600'>{job.employerId?.company} - {job.location}</p>
              <span className='text-red-400 text-sm font-medium'>{job.employmentType}</span>
              <p className='text-gray-600 mt-2'>Skills- {job.skills}</p>
              <p className='text-gray-600'>Salary- Rs.{job.salary}</p>
              <p className='text-gray-600'>Deadline- {job.deadline?.toString().split('T')[0]}</p>
              <Link 
                to={`/jobs/${job._id}`} 
                className='text-red-400 block hover:underline mt-4'
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