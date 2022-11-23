import React from 'react'
import { useState } from 'react';
import { Links, useNavigate } from 'react-router-dom';

function UserSignupForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleSubmit = async event => {
        event.preventDefault();

        const res = await fetch('http://localhost:5005/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        })

        const parsed = await res.json();
        console.log(parsed);

     };

    return (
        <div className='user-signup-form'>
            <form onSubmit={handleSubmit}>
                <label> Username:
                    <input
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </label>
                <label> Email:
                    <input
                        type="text"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </label>
                <label> Password:
                    <input
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default UserSignupForm