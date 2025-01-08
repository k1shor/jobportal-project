import React, { useState } from "react";
import { register } from "../api/UserAPI";

// state variable for the field
export default function Register() {
    const [alert, setAlert] = useState(""); // State for alert message
    const [formValue, setformValue] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    })
    // state variable to show the error message
    const [error, setError] = useState({
        username: "",
        email: "",
        password: ""
    })
    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target;
        // update the form value
        setformValue({
            ...formValue,
            [name]: value
        })
        // check for error
        setError({
            ...error,
            [name]: ""
        })
    }
    // validate 
    const validate = () => {
        const newErrors = { username: "", email: "", password: "" };
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

        if (formValue.password != formValue.confirmPassword) {
            newErrors.password = "Password must be the same"
        }
        setError(newErrors);
        return !Object.values(newErrors).some((error) => error);

    }

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            register(formValue)
                .then(data => {
                    if (data.error) {
                        setAlert(data.error)
                    }
                    else {
                        setAlert('User Registered Successfully')
                        setformValue({
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        })
                    }
                })
        }
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {alert && (
                <div className="fixed top-12 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-10 py-2 text-2xl font-semibold  rounded-lg shadow-md">
                    {alert}
                </div>)}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="/logo.png"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Register Your Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" onSubmit={handleSubmit} method="POST">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
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
                        {error.email && <p className="text-red-500 text-sm">{error.username}</p>}

                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Email address
                        </label>
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

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>

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

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Confirm Password
                            </label>

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

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-base text-gray-500 ">
                    <span>Already a member </span>
                    <a
                        href="/user/login"
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

