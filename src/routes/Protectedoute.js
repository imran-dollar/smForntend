import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import NavBar from '../components/NavBar';
const Protectedoute = ({ children, ...rest }) => {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    return (
        <>
            <NavBar />
            {authToken ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}

export default Protectedoute