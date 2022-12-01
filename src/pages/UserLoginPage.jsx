import React from 'react'
import UserLoginForm from '../components/UserLoginForm';
import { Link } from 'react-router-dom';

function UserLoginPage() {
    return (
        <div className='main'>
            <div className='section-title'>
                <h3>Log In</h3>
            </div>
            <UserLoginForm />
            <div className='form-redirect'>
                <p>Don't have an account? <Link to="/user/signup">Signup</Link></p>
            </div>
        </div>
    )
}

export default UserLoginPage