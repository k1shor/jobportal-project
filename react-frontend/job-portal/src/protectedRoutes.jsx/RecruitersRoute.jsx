import React, { useEffect, useState } from 'react'
import { getRole, isAuthenticated } from '../api/UserAPI'
import { Navigate, Outlet } from 'react-router-dom'

const RecruitersRoute = () => {
    let { role } = isAuthenticated()
    
    return (
             role == 1  ?  <Outlet/> : <Navigate to={'/login'}/>
    )
}

export default RecruitersRoute