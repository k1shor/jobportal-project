"use client"
import React, { useEffect, useState } from 'react';
import { getProfile, profileInfo } from '../../api/UserAPI';
import Overview from './Overview';
import Posts from './Posts';
import Setting from './Settings';
import Resume from './Resume';


const Profile = () => {
    const [username, setUsername] = useState('')
    const [userDetails, setUserDetails] = useState()

    // useState for overview, posts and setting tabs
    const [activeTab, setActiveTab] = useState('overview');

    // this will extract the username from token from localstorage
    useEffect(() => {
        const token = localStorage.getItem("c_user")
        getProfile(token)
            .then((res) => {
                setUsername(res.username)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // this will fetch basic profile information after username extracted
    useEffect(() => {
        if (username) {
            profileInfo(username)
                .then((res) => {
                    setUserDetails(res)
                    console.log(res)

                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, [username])

    // whole page render only when details fetched
    if (userDetails) {
        return (
            <div>
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="http://localhost:5000/profile/default.png"
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
                            {
                                ['overview', 'posts', 'setting', 'resume'].map(tab => {
                                    return (
                                        <button key={tab} onClick={() => {
                                            setActiveTab(tab)
                                        }}
                                            className="flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                            {tab}
                                        </button>
                                    )
                                })
                            }

                        </div>

                        {activeTab === 'overview' && <Overview />}
                        {activeTab === 'posts' && <Posts />}
                        {activeTab === 'setting' && <Setting />}
                        {activeTab === 'resume' && <Resume />}


                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <span className="absolute inset-0 flex items-center justify-center font-semibold text-blue-500">
                        Loading...
                    </span>
                </div>
            </div>
        )
    }


}

export default Profile;