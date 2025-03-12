import React, { useState, useEffect } from "react";
import { isAuthenticated, updateProfile } from "../../api/UserAPI";

const Setting = ({ user }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        bio: "",
        password: "",
        date_of_birth: "",
        gender: "",
        profilePicture: ""
    });
    console.log(formData.dateOfBirth)

    const { token } = isAuthenticated()
    useEffect(() => {
        // Simulating fetching user data from an API or local storage
        const savedData = user || {};
        setFormData((prevData) => ({ ...prevData, ...savedData }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    const handleSave = () => {
        console.log("Settings saved:", formData);
        let info = new FormData()
        for (var key in formData) {
            info.append(key, formData[key])
        }

        updateProfile(token, info)
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    alert("Your settings have been saved.");
                }
            })
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth.toString().split("T")[0]}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default Setting;
