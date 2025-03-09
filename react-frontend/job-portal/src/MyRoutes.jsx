import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import VerifyEmail from './Pages/VerifyEmail'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import Profile from './Pages/Profile/Profile'
import Posts from './Pages/Profile/Posts'
import Resume from './Pages/Profile/Resume'
import Setting from './Pages/Profile/Settings'
import ServicePage from './Pages/ServicePage'
import JobsPage from './Pages/JobsPage'
import JobDetailsPage from './Pages/JobDetailsPage'
import RecruitersPage from './Pages/RecruitersPage'
import Candidates from './Pages/Recruiters/Candidates'
import RecruitersLayout from './Layout/Recruiter/RecruitersLayout'
import RecruitersDashboard from './Pages/Recruiters/RrecuitersDashboard'
import Applications from './Pages/Recruiters/Applications'
import JobPostings from './Pages/Recruiters/JobPostings'
import Settings from './Pages/Recruiters/Settings'

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/verify-email/:token' element={<VerifyEmail />} />
                    <Route path='/forgetpassword' element={<ForgotPassword />} />
                    <Route path='/resetpassword/:token' element={<ResetPassword />} />

                    <Route path='services' element={<ServicePage />} />
                    <Route path='jobs' element={<JobsPage />} />
                    <Route path='jobs/:id' element={<JobDetailsPage />} />
                    <Route path='companies' element={<RecruitersPage />} />




                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/posts' element={<Posts />} />
                    <Route path='/profile/resume' element={<Resume />} />
                    <Route path='/profile/settings' element={<Setting />} />
                </Route>

                <Route path='/recruiters' element={<RecruitersLayout />}>
                    <Route path='dashboard' element = {<RecruitersDashboard/>}/>
                    <Route path='candidates' element={<Candidates />} />
                    <Route path='applications' element = {<Applications/>}/>
                    <Route path='job-postings' element = {<JobPostings/>}/>
                    <Route path='settings' element = {<Settings/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes