import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config';
import { getCompanies } from '../api/UserAPI';



const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setCompanies(data.data);

                }
            })
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className='max-w-6xl mx-auto text-center'>
                <h2 className='text-4xl font-bold text-red-400 mb-6'>Companies</h2>
                <p className='text-gray-600 mb-12'>Explore the latest job opportunities from top companies.</p>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {companies.map((job) => (
                        <div key={job._id} className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition'>
                            <img src={`${API}/${job.picture}`} alt={job.image} />
                            <h3 className='text-xl font-semibold text-gray-800'>{job.title}</h3>
                            <p className='text-gray-600'>{job.employerId?.company} - {job.location}</p>
                            <span className='text-sm text-red-400 font-medium'>{job.employmentType}</span>
                            <p className='text-gray-600 mt-2'>Skills- {job.skills}</p>
                            <p className='text-gray-600'>Salary- Rs.{job.salary}</p>
                            <p className='text-gray-600'>Deadline- {job.deadline?.toString().split('T')[0]}</p>
                            <Link
                                to={`/jobs/${job._id}`}
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

export default Companies;