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

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element = {<Login/>}/>
                    <Route path='/verify-email/:token' element = {<VerifyEmail/>}/>
                    <Route path='/forgetpassword' element={<ForgotPassword/>}/>
                    <Route path='/resetpassword/:token' element = {<ResetPassword/>}/>

                    <Route path='/profile' element = {<Profile/>}/>
                    <Route path='/profile/posts' element = {<Posts/>} />
                    <Route path='/profile/resume' element = {<Resume/>}/>
                    <Route path='/profile/settings' element = {<Setting/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes