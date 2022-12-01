import React from 'react'
import UserLoginForm from '../components/UserLoginForm'

function UserLoginPage() {
    return (
        <div className='main'>
            <div className='section-title'>
                <h3>Log In</h3>
            </div>
            <UserLoginForm />
        </div>
    )
}

export default UserLoginPage