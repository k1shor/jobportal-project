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
import Candidates from './Pages/Recruiters/Candidates'
import RecruitersLayout from './Layout/Recruiter/RecruitersLayout'
import RecruitersDashboard from './Pages/Recruiters/RrecuitersDashboard'
import Applications from './Pages/Recruiters/Applications'
import JobPostings from './Pages/Recruiters/JobPostings'
import Settings from './Pages/Recruiters/Settings'
import Companies from './Pages/Companies'
import RecruitersRoute from './protectedRoutes.jsx/RecruitersRoute'
import AboutPage from './Pages/About'
import PrivacyPolicyPage from './Pages/PrivacyStatements'
import Terms from './Pages/Terms'
import ContactPage from './Pages/ContactPage'
import CompanyDetail from './Pages/CompanyDetails'

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
                    <Route path='about' element={<AboutPage />} />
                    <Route path='jobs' element={<JobsPage />} />
                    <Route path='jobs/:id' element={<JobDetailsPage />} />
                    <Route path='company' element={<Companies />} />
                    <Route path="/companies/:id" element={<CompanyDetail />} /> {/* Dynamic route for company details */}


                    <Route path='contact' element = {<ContactPage/>}/>

                    <Route path='privacy-policy' element={<PrivacyPolicyPage/>}/>
                    <Route path='terms' element = {<Terms/>}/>




                </Route>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/posts' element={<Posts />} />
                    <Route path='/profile/resume' element={<Resume />} />
                    <Route path='/profile/settings' element={<Setting />} />
                <Route path='/' element={<RecruitersLayout />}>
                    <Route path='recruiters' element={<RecruitersRoute />}>
                        <Route index element={<RecruitersDashboard />} />
                        <Route path='candidates' element={<Candidates />} />
                        <Route path='applications' element={<Applications />} />
                        <Route path='job-postings' element={<JobPostings />} />
                        <Route path='settings' element={<Settings />} />

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes