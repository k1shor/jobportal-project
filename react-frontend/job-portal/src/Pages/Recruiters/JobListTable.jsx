import React, { useEffect, useState } from 'react'
import { getAllVacancies } from '../../api/vacancyAPI'

const JobListTable = ({ jobPostingForm }) => {
    const [jobPostings, setJobPostings] = useState([])

    useEffect(() => {
        getAllVacancies()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setJobPostings(data.data)
                }
            })
    }, [jobPostingForm])

    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-800">Job Postings</h1>
            <div className="mt-8">
                
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Number</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Deadline</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobPostings.length > 0 &&
                            jobPostings.map((job) => (
                                <tr key={job.id} className="border-b">
                                    <td className="px-4 py-2">{job.title}</td>
                                    <td className="px-4 py-2">{job.category}</td>
                                    <td className="px-4 py-2">{job.location}</td>
                                    <td className="px-4 py-2">{job.vacancies}</td>
                                    <td className="px-4 py-2">{job.employmentType}</td>
                                    <td className="px-4 py-2">{job.status == 1 ? "Active" : "Expired"}</td>
                                    <td className="px-4 py-2">{job.deadline.toString().split('T')[0]}</td>
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
    )
}

export default JobListTable