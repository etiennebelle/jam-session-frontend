import React from 'react'
import UserSignupForm from '../components/UserSignupForm';
import { Link } from 'react-router-dom';

function UserSignupPage() {

    return (
        <div className='main'>
            <div className='section-title'>
                <h3>Sign Up</h3>
            </div>
            <UserSignupForm />
            <div className='form-redirect'>
                <p>Already have an account? <Link to="/user/login">Login</Link></p>
            </div>
        </div>
    )
}

export default UserSignupPage