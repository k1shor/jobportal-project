import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useNavigate } from 'react-router-dom'
import { changePassword, verifyTokenForResetPassword } from '../api/UserAPI'

const ResetPassword = () => {

    // access verification token from the url
    const { token } = useParams()

    // router
    const navigate = useNavigate()

    // state for password and confirm password
    const [formValue, setformValue] = useState({
        password: '',
        confirmPassword: '',
    })


    useEffect(() => {
        if (!token) return


        // verify the token
        verifyTokenForResetPassword(token)
            .then(data => {
                if (data?.error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error',
                        text: data.error,
                        showConfirmButton: true,
                    });
                }
                if (data?.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Success',
                        text: data.success,
                        showConfirmButton: true,
                    });
                    // delete the token from the database once the token is verified
                }
            })
            .catch(error => console.log(error))
    }, [])

    // handle submit
    const handleSubmit = e => {
        e.preventDefault();
        // console.log(formValue)

        // update the password in the database
        changePassword({ password: formValue.password }, token)
            .then(data => {
                if (data?.error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error',
                        text: data.error,
                        showConfirmButton: true,
                    });
                }
                if (data?.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Success',
                        text: data.success,
                        showConfirmButton: true,
                    });
                    // navigate the user to the login page after the password change
                    navigate('/login')

                }
            })
    }

    // handle change 
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setformValue({
            ...formValue,
            [name]: value
        })
    }
    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="/logo.jpg"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit} method="POST">

                    {/* type new password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Enter New Password
                            </label>

                        </div>

                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formValue.password}
                                onChange={handleChange}
                                suggest="new-password"
                                // autoComplete='new-password'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                    </div>

                    {/* confirm new password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Confirm New Password
                            </label>

                        </div>

                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formValue.confirmPassword}
                                onChange={handleChange}
                                suggest="new-password"
                                // autoComplete='new-password'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"

                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            change password
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default ResetPassword