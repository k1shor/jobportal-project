import React from "react";
import { API } from "../../config";

const Overview = ({ user }) => {
    const { fullName, phone, email, profile_picture, date_of_birth, gender, bio, education, experience } = user;
    
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Profile Overview</h2>
            <div className="flex items-center mb-4">
                <img src={`${API}/${profile_picture}`} alt="Profile" className="w-52 h-52 rounded-full mr-4 border-2 border-red-400" />
                <div>
                    <h3 className="text-3xl font-semibold text-gray-900">{fullName}</h3>
                    <p className="text-gray-600 text-xl font-semibold">{gender} | {date_of_birth.toString().split('T')[0]}</p>
                </div>
            </div>
            <div className="text-gray-700 space-y-2 text-xl font-semibold">
                <p><span className="font-semibold">Phone:</span> {phone}</p>
                <p><span className="font-semibold">Email:</span> {email}</p>
                <p><span className="font-semibold">Bio:</span> {bio}</p>
            </div>
            
            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2">Educational Qualifications</h3>
                {education?.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {education.map((edu, index) => (
                            <li key={index} className="text-lg">
                                {edu.degree} from {edu.college}, {edu.university} ({edu.passed_year})
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-600">No education details available.</p>}
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2">Job Experience</h3>
                {experience?.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {experience.map((exp, index) => (
                            <li key={index} className="text-lg">
                                {exp.position} at {exp.company} ({exp.year})
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-gray-600">No job experience available.</p>}
            </div>
        </div>
    );
};

export default Overview;