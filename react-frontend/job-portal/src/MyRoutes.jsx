import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element = {<Login/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes