import React, { useState } from "react";
import { register } from "../api/UserAPI";
import { Link } from "react-router-dom";

// state variable for the field
export default function Register() {
    const [alert, setAlert] = useState(""); // State for alert message
    const [formValue, setformValue] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        date_of_birth: "",
        role: ""  // Added role field
    });

    // state variable to show the error message
    const [error, setError] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        date_of_birth: "",
        role: ""  // Added role field for error handling
    });

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        // update the form value
        setformValue({
            ...formValue,
            [name]: value
        });
        // check for error
        setError({
            ...error,
            [name]: ""
        });
    };

    // validate 
    const validate = () => {
        const newErrors = { first_name: "", last_name: "", username: "", email: "", password: "", gender: "", date_of_birth: "", role: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formValue.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formValue.username.length < 5) {
            newErrors.username = "username must be at least 5 characters long";
        }
        if (!formValue.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formValue.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formValue.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (formValue.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (formValue.password !== formValue.confirmPassword) {
            newErrors.password = "Password must be the same";
        }
        // check gender selection
        if (!formValue.gender) {
            newErrors.gender = "Please select one";
        }

        // check for date of birth
        if (!formValue.date_of_birth) {
            newErrors.date_of_birth = "Please select your date of birth";
        }

        // check for role selection
        if (!formValue.role) {
            newErrors.role = "Please select a role.";
        }

        setError(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            register(formValue)
                .then((data) => {
                    if (data.error) {
                        setAlert(data.error);
                    } else {
                        setAlert('User Registered Successfully');
                        setformValue({
                            first_name: "",
                            last_name: "",
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            gender: "",
                            date_of_birth: "",
                            role: ""  // Clear role field
                        });
                    }
                });
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {alert && (
                <div className="fixed top-12 left-3/4 transform -translate-x-1/2 bg-green-400 text-white px-10 py-2 text-2xl font-semibold rounded-lg shadow-md">
                    {alert}
                </div>
            )}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
                <img className="mx-auto h-20 rounded-3xl w-auto" src="/favicon.webp" alt="Company Logo" />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Register Your Account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                    {/* first name */}
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-900">First Name:</label>
                        <div className="mt-2">
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={formValue.first_name}
                                onChange={handleChange}
                                autoComplete="first_name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.first_name && <p className="text-red-500 text-sm">{error.first_name}</p>}
                    </div>

                    {/* last name */}
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-900">Last Name:</label>
                        <div className="mt-2">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={formValue.last_name}
                                onChange={handleChange}
                                autoComplete="last_name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.last_name && <p className="text-red-500 text-sm">{error.last_name}</p>}
                    </div>

                    {/* username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formValue.username}
                                onChange={handleChange}
                                autoComplete="username"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
                    </div>

                    {/* email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                value={formValue.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    </div>

                    {/* password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formValue.password}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                    </div>

                    {/* confirm password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formValue.confirmPassword}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                    </div>

                    {/* gender */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">Gender</label>
                        </div>
                        <div className="mt-2">
                            <select
                                id="gender"
                                name="gender"
                                value={formValue.gender}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        {error.gender && <p className="text-red-500 text-sm">{error.gender}</p>}
                    </div>

                    {/* date of birth */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-900">Date of Birth</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="date_of_birth"
                                name="date_of_birth"
                                type="date"
                                value={formValue.date_of_birth}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                        {error.date_of_birth && <p className="text-red-500 text-sm">{error.date_of_birth}</p>}
                    </div>

                    {/* role */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role</label>
                        </div>
                        <div className="mt-2">
                            <select
                                id="role"
                                name="role"
                                value={formValue.role}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            >
                                <option value="">Select Role</option>
                                <option value={0}>User</option>
                                <option value={1}>Company</option>
                            </select>
                        </div>
                        {error.role && <p className="text-red-500 text-sm">{error.role}</p>}
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-base text-gray-500 ">
                    <span>Already a member </span>
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl"
                    >
                        Login now
                    </Link>
                </p>
            </div>
        </div>
    );
}
