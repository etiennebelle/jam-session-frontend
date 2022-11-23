import React from 'react'
import { useState } from 'react';

function UserSignupForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        const res = await fetch('http://localhost:5005/signup');
        
     };

    return (
        <div className='user-signup-form'>
            <form onSubmit={handleSubmit}>
                <label> Username:
                    <input
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        required
                    />
                </label>
                <label> Email:
                    <input
                        type="text"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </label>
                <label> Password:
                    <input
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </label>
            </form>
        </div>
    )
}

export default UserSignupForm