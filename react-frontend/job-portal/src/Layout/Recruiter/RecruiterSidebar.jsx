import React from 'react'
import { Link } from 'react-router-dom'

const RecruiterSidebar = () => {
    return (
        <>
            <div className="w-64 bg-red-400 text-white min-h-screen ">
                <ul className="space-y-4 sticky top-0 p-5">
                <h2 className="text-2xl font-bold mb-8 ">Recruiters Dashboard</h2>

                    <li><Link to="/" className="hover:text-red-200">Home</Link></li>
                    <li><Link to="recruiters" className="hover:text-red-200">Dashboard</Link></li>
                    <li><Link to="recruiters/job-postings" className="hover:text-red-200">Job Postings</Link></li>
                    <li><Link to="recruiters/applications" className="hover:text-red-200">Applications</Link></li>
                    <li><Link to="recruiters/candidates" className="hover:text-red-200">Candidates</Link></li>
                    <li><Link to="recruiters/settings" className="hover:text-red-200">Settings</Link></li>
                </ul>
            </div>
        </>
    )
}

export default RecruiterSidebar