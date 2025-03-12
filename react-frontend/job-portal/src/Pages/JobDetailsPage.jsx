import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVacancyDetails } from '../api/vacancyAPI';
import { API } from '../config';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState()


  useEffect(() => {
    getVacancyDetails(id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          console.log(data)
          setJob(data.data)
        }
      })
  }, [])



  return (
    <div className='bg-gray-100 p-8 flex justify-center'>
      <div className='bg-white p-6 rounded-xl shadow-lg w-[90vw] md:w-[75vw] lg:w-[60vw]'>
        {
          job &&
          <>
          <img src={`${API}/${job.image}`} alt="" className='h-48 bg-gray-100 mb-5' />
            <h2 className='text-3xl font-bold text-red-400 mb-4'>{job.title}</h2>
            <p className='text-xl ext-gray-600'><strong>Company:</strong> {job.company}</p>
            <p className='text-xl text-gray-600'><strong>Location:</strong> {job.location}</p>
            <p className='text-xl text-gray-600'><strong>Job Type:</strong> {job.employmentType}</p>
            <p className='text-xl text-gray-600'><strong>Experience:</strong> {job.experience} years</p>
            <p className='text-xl text-gray-800 mt-4'><strong>Job Description:</strong> {job.responsibilities}</p>
            <p className='text-xl text-gray-600'><strong>Skills:</strong> {job.skills}<br/>{job.otherSkills}</p>
            <p className='text-xl text-gray-600'><strong>Salary:</strong> Rs.{job.salary}</p>
            <p className='text-xl text-gray-600'><strong>Deadline:</strong> {job.deadline.toString().split('T')[0]}</p>
            <p className='text-xl text-gray-600'><strong>No. of Positions:</strong> {job.vacancies}</p>

          </>
        }
      <button className='primary-btn my-5'>APPLY NOW</button>
      <button className='secondary-btn my-5'>CHECK STATUS</button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
