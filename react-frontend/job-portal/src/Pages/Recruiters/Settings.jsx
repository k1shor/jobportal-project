import React, { useState, useEffect } from 'react';
import { isAuthenticated, updateProfile, getProfile } from '../../api/UserAPI';
import Swal from 'sweetalert2';
import { API } from '../../config';

const Settings = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
    bio: '',
    date_of_birth: '',
    profile_picture: null,
  });

  const [preview, setPreview] = useState(null);
  const { token } = isAuthenticated();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getProfile(token);
        console.log(userData)
        if (userData) {
          setFormData({ ...userData, password: '', profile_picture: null });
          if (userData.profile_picture) {
            setPreview(userData.profile_picture);
          }
        } else {
          console.error('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        profile_picture: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'profile_picture' && formData.profile_picture) {
        formDataToSend.append(key, formData.profile_picture);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    updateProfile(token, formDataToSend).then((data) => {
      if (data.error) {
        Swal.fire('Attention !!!', data.error, 'error');
      } else {
        Swal.fire('Congrats!!!', 'Information Updated', 'success');
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mt-10 mx-auto">
      <h1 className="text-3xl text-center text-gray-800 font-semibold">Account Settings</h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : (
        <form className="mt-8" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <label className="text-gray-600 text-lg font-medium">Company Logo</label>
              <div className="mt-3">
                {preview ? (
                  <img src={`${API}/${preview}`} alt="Company Logo" className="h-24 rounded-full shadow-md w-24" />
                ) : (
                  <div className="flex bg-gray-200 h-24 justify-center rounded-full w-24 items-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-600 text-sm mt-3"
              />
            </div>

            {/* User Information Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-gray-600 text-lg font-medium">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-lg font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-gray-600 text-lg block font-medium">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md w-full"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-lg block font-medium">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md w-full"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-lg block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-200 border border-gray-300 p-3 rounded-md w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 text-lg block font-medium">New Password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-md w-full"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="text-gray-600 text-lg block font-medium">Mission & Vision</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-md w-full"
                  placeholder="Tell us about your company..."
                ></textarea>
              </div>

              <div>
                <label className="text-gray-600 text-lg block font-medium">Establishment Date</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth.split("T")[0]}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-red-400 rounded-lg text-white duration-300 font-semibold hover:bg-red-500 px-6 py-3 transition-all"
            >
              Save Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Settings;
