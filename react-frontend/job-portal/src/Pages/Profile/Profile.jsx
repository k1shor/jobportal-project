import React, { useEffect, useState } from 'react';
import { getProfile, isAuthenticated, profileInfo } from '../../api/UserAPI';  // Assuming these are your API functions
import Overview from './Overview';
import Posts from './Posts';
import Setting from './Settings';
import Resume from './Resume';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    const {token, user} = isAuthenticated()

    // This will extract the username from token in localStorage
    useEffect(() => {
        if (token) {
            getProfile(token, user._id)
                .then((res) => {
                    setUsername(res.username);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    // Fetch basic profile information after username is extracted
    useEffect(() => {
        if (username) {
            setLoading(true);
            profileInfo(username)
                .then((res) => {
                    setUserDetails(res);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [username]);



    return (
        loading ?
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <span className="absolute inset-0 flex items-center justify-center font-semibold text-blue-500">
                        Loading...
                    </span>
                </div>
            </div>
            :
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-red-400 to-red-600 p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={userDetails.profilePicture || "http://localhost:5000/profile/default.png"}  // Dynamic image URL or fallback
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white"
                            />
                            <div className="text-white">
                                <h1 className="text-2xl font-bold">
                                    <span>{userDetails.first_name.charAt(0).toUpperCase() + userDetails?.first_name.slice(1) + " "}</span>
                                    <span>{userDetails.last_name.charAt(0).toUpperCase() + userDetails?.last_name.slice(1)}</span>
                                </h1>
                                <p className="text-sm opacity-80">{userDetails.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-200">
                        {['overview', 'posts', 'setting', 'resume'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 text-center font-medium ${activeTab === tab ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700'} hover:bg-gray-100`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content Based on Active Tab */}
                    {activeTab === 'overview' && <Overview />}
                    {activeTab === 'posts' && <Posts />}
                    {activeTab === 'setting' && <Setting />}
                    {activeTab === 'resume' && <Resume />}
                </div>
            </div>
    );
}

export default Profile;
