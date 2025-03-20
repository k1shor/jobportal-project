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
    <div className='bg-gray-100 py-5'>
      <div className='bg-white p-6 rounded-xl shadow-lg w-[90vw] lg:w-[60vw] md:w-[75vw] mx-auto'>
        {
          job &&
          <>
            <img src={`${API}/${job.image}`} alt="" className='bg-gray-100 w-full mb-5' />
            <div className='px-28'>

              <h2 className='text-3xl text-red-400 font-bold mb-4'>{job.title}</h2>
              <p className='text-xl ext-gray-600'><strong>Company:</strong> {job.company}</p>
              <p className='text-gray-600 text-xl'><strong>Location:</strong> {job.location}</p>
              <p className='text-gray-600 text-xl'><strong>Job Type:</strong> {job.employmentType}</p>
              <p className='text-gray-600 text-xl'><strong>Experience:</strong> {job.experience} years</p>
              <p className='text-gray-800 text-xl mt-4'><strong>Job Description:</strong> {job.responsibilities}</p>
              <p className='text-gray-600 text-xl'><strong>Skills:</strong> {job.skills}<br />{job.otherSkills}</p>
              <p className='text-gray-600 text-xl'><strong>Salary:</strong> Rs.{job.salary}</p>
              <p className='text-gray-600 text-xl'><strong>Deadline:</strong> {job.deadline.toString().split('T')[0]}</p>
              <p className='text-gray-600 text-xl'><strong>No. of Positions:</strong> {job.vacancies}</p>
            </div>

          </>
        }
        <div className='px-28'>
          {status ?
            <>
              <h2 className='text-xl font-bold'>Status: {status.toUpperCase()}</h2>
              <Link to={`/applications/${application}`} className='text-xl bold link underline'>View Application</Link>
            </>

            :
            <button className='my-5 primary-btn' onClick={handleApply}>APPLY NOW</button>
          }
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
