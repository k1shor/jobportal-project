import React, { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationAPI";
import { isAuthenticated } from "../../api/UserAPI";
import { Link } from "react-router-dom";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const {token} = isAuthenticated()
    useEffect(() => {
        getMyApplications(token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setApplications(data.data)
                }
            })
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Applications</h2>
            {
                applications.length > 0 ? (
                    applications.map((application) => (
                        <div key={application.id} className="mb-4 border-b pb-2">
                            <h3 className="font-bold">Position: {application.vacancyId?.title}</h3>
                            <p className="text-gray-700">Salary: Rs.{application.vacancyId?.salary}</p>
                            <p className="text-gray-700">Company: {application.vacancyId?.employerId?.company}</p>
                            <p className="text-gray-700">Status: {application.status}</p>
                            <Link to={`/`}>View Details</Link>

                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">You haven't created any applications yet. Start sharing your thoughts!</p>
                )}
        </div>
    );
}

export default Applications;