import React from 'react'
import { useState, useContext } from 'react';
import { UserAuthContext } from '../contexts/user-auth.context';
import { Link, useNavigate } from 'react-router-dom';

function UserLoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const { storeToken } = useContext(UserAuthContext);

    const handleSubmit = async event => {
        event.preventDefault();
       
        try {
            const res = await fetch('http://localhost:5005/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
            const parsed = res.json();
            storeToken(parsed.authToken)
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='user-login-form'>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </label>
                <label>Password:
                    <input
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default UserLoginForm