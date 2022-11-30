import React from 'react'
import { useState, useContext } from 'react';
import { UserAuthContext } from '../contexts/user-auth.context';
import { useNavigate } from 'react-router-dom';
import UserLoginComponent from './UserLoginComponent';


function UserLoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState()

    const { storeToken, setIsLoggedIn, authenticateUser } = useContext(UserAuthContext);

    const handleSubmit = async event => { 
        try {
            event.preventDefault();
            const res = await fetch(`${process.env.API_URL}user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
            const parsed = await res.json();
            storeToken(parsed.authToken);

            if (res.status === 200) {
                setIsLoggedIn(true);
                authenticateUser();
                navigate('/user/profile');
            } else {
                setErrorMessage(parsed.message)
            }

        } catch (error) {
            console.log(error);
            const errorDescription = error.message;
            setErrorMessage(errorDescription);
        }
    }

    return (
            <UserLoginComponent
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
            />
            
    )
}

export default UserLoginForm