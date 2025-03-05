import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyEmail } from '../api/UserAPI'

const VerifyEmail = () => {
        // take the user token from the parameter
    const params = useParams()
    const token = params.token

    // navigate to another page
    const navigate = useNavigate()

    useEffect(() => {
        verifyEmail(token)
            .then(data => {
                if (data?.success) {
                    // success alert
                    Swal.fire({
                        title: data.success,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login")

                        } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");
                        }
                    });

                } else if (data?.error) {
                    // sweet alert if any error from the backend server
                    Swal.fire({
                        title: data.error,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            navigate.push("/login")
                        }
                    });


                }

            })

    }, [])


    return (
        <div>
        </div>
    )
}

export default VerifyEmail