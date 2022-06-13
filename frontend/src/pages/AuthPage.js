import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/login.css'
import twitterLogo from '../assets/Images/Twitter-logo.svg.png'
import { Alert, AlertTitle } from '@mui/material'


const AuthPage = () => {

    const { errors } = useSelector(state => state.auth)

    return (
        <div className="container">
            {errors &&
                <Alert variant="outlined" severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        )
                        )}
                    </ul>
                </Alert>
            }
            <img src={twitterLogo}
                alt="logo" style={{ width: "50px" }}
                className="logo"
            />
            <Outlet />
        </div>
    )
}

export default AuthPage