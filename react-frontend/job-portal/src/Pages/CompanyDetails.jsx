import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../config';
import { getCompanyDetails } from '../api/UserAPI';
import { getCompanyJobs } from '../api/vacancyAPI';

const CompanyDetail = () => {
    const { id } = useParams();  // Get the company id from the URL
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);  // State to store job posts


    useEffect(() => {
        // Fetch the details of the company by ID
        getCompanyDetails(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setCompany(data);  // Assuming data contains company info
                }
            });
        // Fetch job posts made by the company
        getCompanyJobs(id)
            .then(data => {
                console.log(data)
                if (data.error) {
                    console.log(data.error);
                } else {
                    setJobs(data);  // Assuming data contains jobs posted by the company
                }
            });
    }, [id]);

    if (!company) {
        return <div>Loading...</div>;  // Show loading state while data is being fetched
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    {/* Company profile picture */}
                    <img
                        src={`${API}/${company.profile_picture}`}
                        alt={company.company}
                        className="w-full h-84 object-cover rounded-lg"
                    />
                    {/* Company name */}
                    <h2 className="text-3xl font-bold text-gray-800 mt-6">{company.company}</h2>

                    <p className="text-gray-600 mt-2"><strong>Email</strong>: {company.email}</p>
                    <p className="text-gray-600 mt-2"><strong>Contact</strong>: {company.phone}</p>
                    <p className="text-gray-600 mt-2"><strong>Company Bio</strong>: <br />{company.bio}</p>

                    <h3 className="text-2xl font-semibold text-gray-800 mt-8">Recent Job Posts</h3>
                    {/* Job Posts Section */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {jobs.length === 0 ? (
                        <p className="text-gray-600">No job posts available at the moment.</p>
                    ) : (
                        <ul className="space-y-4">
                            {jobs.map((job) => (
                                <li key={job._id} className="bg-white p-6 pt-8 npm rounded-xl shadow-lg hover:shadow-xl transition">
                                    <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
                                    <p className="text-gray-600">Location: {job.location}</p>
                                    <p className="text-gray-600">Salary: Rs.{job.salary}</p>
                                    <p className="text-gray-600">Deadline: {job.deadline?.toString().split('T')[0]}</p>
                                    <Link to={`/jobs/${job._id}`} className="block mt-4 text-red-400 hover:underline">
                                        View Details
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default CompanyDetail;
