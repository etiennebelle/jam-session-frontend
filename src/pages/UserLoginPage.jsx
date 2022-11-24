import React from 'react'
import UserLoginForm from '../components/UserLoginForm'
import { Link } from 'react-router-dom';

function UserLoginPage() {
    return (
        <div>
            <UserLoginForm />
            <p>Don't have an account yet?</p>
            <Link to={"/user/signup"}> Sign Up</Link>
        </div>
    )
}

export default UserLoginPage