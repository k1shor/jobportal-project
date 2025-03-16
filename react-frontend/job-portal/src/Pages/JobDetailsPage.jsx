import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVacancyDetails } from '../api/vacancyAPI';
import { API } from '../config';
import { applyNow, getApplicationStatus } from '../api/applicationAPI';
import { isAuthenticated } from '../api/UserAPI';
import Swal from 'sweetalert2';

const JobDetailsPage = () => {
  let [status, setStatus] = useState('')
  let [application, setApplication] = useState('')
  let [success, setSuccess] = useState(false)
  const { id } = useParams();
  const [job, setJob] = useState()
  const { token } = isAuthenticated()

  useEffect(() => {
    getVacancyDetails(id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setJob(data.data)
          getApplicationStatus(id, token)
            .then(data => {
              if (data.success) {
                console.log(data)
                setStatus(data.status)
                setApplication(data.id)
                setSuccess(false)
              }
            })
        }
      })
  }, [success])

  const handleApply = e => {
    e.preventDefault()
    applyNow(id, token)
      .then(data => {
        if (data.error) {
          console.log(data.error)
          Swal.fire(data.error)
        }
        else {
          Swal.fire('Congrats!!', data.message, 'success')
          setSuccess(true)
        }
      })
  }



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
            <p className='text-xl text-gray-600'><strong>Skills:</strong> {job.skills}<br />{job.otherSkills}</p>
            <p className='text-xl text-gray-600'><strong>Salary:</strong> Rs.{job.salary}</p>
            <p className='text-xl text-gray-600'><strong>Deadline:</strong> {job.deadline.toString().split('T')[0]}</p>
            <p className='text-xl text-gray-600'><strong>No. of Positions:</strong> {job.vacancies}</p>

          </>
        }
        {status ?
          <>
          <h2 className='text-xl font-bold'>Status: {status.toUpperCase()}</h2>
          <Link to={`/applications/${application}`} className='text-xl bold underline link '>View Application</Link>
          </>

          :
          <button className='primary-btn my-5' onClick={handleApply}>APPLY NOW</button>
        }
      </div>
    </div>
  );
};

export default JobDetailsPage;
