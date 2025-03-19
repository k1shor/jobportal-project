import React, { useEffect, useState } from 'react';
import { getProfile, isAuthenticated } from '../../api/UserAPI';  // Assuming these are your API functions
import Overview from './Overview';
import Posts from './Posts';
import Setting from './Settings';
import Resume from './Resume';
import Applications from './Posts';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    const { token } = isAuthenticated()
    const navigate = useNavigate()

    // This will extract the username from token in localStorage
    useEffect(() => {
        if (token) {
            getProfile(token)
                .then((res) => {
                    console.log(res)
                    setUser(res);
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        else {
            navigate('/login')
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        navigate('/')
    }





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
                    <div className="bg-gradient-to-r from-red-400 to-red-600 p-6 flex justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user?.profile_picture ? user.profile_picture : "http://localhost:5000/profile/default.png"}  // Dynamic image URL or fallback
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white"
                            />
                            <div className="text-white">
                                <h1 className="text-2xl font-bold">

                                </h1>
                                <p className="text-sm opacity-80">{user?.email}</p>
                            </div>
                        </div>
                        <div>
                            <Link to='/' className='link'>HOME</Link>
                            <button className='btn' onClick={handleLogout}>LOGOUT</button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-200">
                        {['overview', 'applications', 'settings', 'resume'].map(tab => (
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
                    {activeTab === 'overview' && <Overview user={user} />}
                    {activeTab === 'applications' && <Applications />}
                    {activeTab === 'settings' && <Setting user={user} />}
                    {activeTab === 'resume' && <Resume user={user} />}
                </div>
            </div>
    );
}

export default Profile;
