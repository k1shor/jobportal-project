import React from "react";
import { API } from "../../config";

const Overview = ({user}) => {
    const { fullName, phone, email, profile_picture, date_of_birth, gender, bio } = user
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Profile Overview</h2>
            <div className="flex items-center mb-4">
                <img src={`${API}/${profile_picture}`} alt={`${API}/${profile_picture}`} className="w-52 h-52 rounded-full mr-4 border-2 border-red-400" />
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
        </div>
    );
}

export default Overview;
