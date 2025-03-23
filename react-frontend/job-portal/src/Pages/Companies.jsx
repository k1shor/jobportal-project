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
                    console.log(data);
                    setCompanies(data.data); // Assuming data is an array of users
                }
            })
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 p-8'>
            <div className='max-w-6xl mx-auto text-center'>
                <h2 className='text-4xl font-bold text-red-400 mb-6'>Companies</h2>
                <p className='text-gray-600 mb-12'>Explore the latest opportunities from top companies.</p>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {companies.filter(company => company.role === 1).map((company) => (  // Filter to show only companies (role === 1)
                        <div key={company._id} className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition'>
                            <img src={`${API}/${company.profile_picture}`} alt={company.company} className="w-full h-auto object-cover rounded-t-lg" />
                            <h3 className='text-xl font-semibold text-gray-800'>{company.company}</h3> {/* Displaying the company name */}
                            {/* <p className='text-gray-600'>{company.first_name} {company.last_name}</p>  */}
                            <p className='text-gray-600'>{company.email}</p>
                            <p className='text-gray-600 mt-2'>{company.bio}</p> {/* Displaying bio if available */}
                            <Link
                                to={`/companies/${company._id}`}  // Assuming you have a route for individual companies
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
