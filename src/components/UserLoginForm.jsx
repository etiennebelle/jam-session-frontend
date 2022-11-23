import React from 'react'
import { useState } from 'react';

function UserLoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const handleSubmit = async event => {
        event.preventDefault();

        const res = await fetch('http://localhost:5005/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
        const parsed = res.json();
        console.log(parsed);
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