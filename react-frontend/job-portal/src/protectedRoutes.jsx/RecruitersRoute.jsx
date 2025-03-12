import React, { useEffect, useState } from 'react'
import { getRole, isAuthenticated } from '../api/UserAPI'
import { Navigate, Outlet } from 'react-router-dom'

const RecruitersRoute = () => {
    let { token } = isAuthenticated()
    let [role, setRole] = useState(0)
    useEffect(() => {
        getRole(token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                console.log(data.data)
                setRole(data.data)
            })
    }, [])
    return (
             role == 1  ?  <Outlet/> : <Navigate to={'/login'}/>
    )
}

export default RecruitersRoute