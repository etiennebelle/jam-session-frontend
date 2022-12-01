import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {HostAuthContext} from '../contexts/host-auth.context';
import { Button, TextInput, PasswordInput } from '@mantine/core';

function HostLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const { storeToken, setIsHostLoggedIn, authenticateHost } = useContext(HostAuthContext); 

    const handleSubmit = async event => {
        try {
            event.preventDefault();

            const response = await fetch(`${process.env.REACT_APP_API_URL}host/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify({email, password})
            })
            const parsed = await response.json()
            storeToken(parsed.authToken)
            if (response.status === 200) {
                setIsHostLoggedIn(true)
                authenticateHost();
                navigate('/host/profile')
            } else {
                setErrorMessage(parsed.message)
            }
        } catch (error) {
           const errorDescription = error.message;
           setErrorMessage(errorDescription); 
        }
        
    }

  return (
    <div>
        <div className='section-title'>
            <h3>Host Log In</h3>
        </div>
        <div className='labels-ctn'>
        <form className='crud-form' onSubmit={handleSubmit}>
            <label className='create-label'>
                <TextInput 
                type="text" 
                value={email} 
                placeholder="Email"
                radius="xs"
                onChange={event => setEmail(event.target.value)} 
                required/>
            </label>
            <label className='create-label'>
                <PasswordInput 
                type="password" 
                placeholder="Password"
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                description="Password must include at least one letter, number and special character"
                required
                radius="xs"
                />
            </label>
            <div className='crud-btn'>
                <Button
                    type='submit'
                    color="dark"
                    radius="xl">
                    Signup
                </Button>
            </div>
        </form>
        </div>
        <p>Don't have a host account yet? <Link to="/host/signup">Signup</Link></p>
        { errorMessage && <p>{errorMessage}</p> }
        

    </div>
  )
}

export default HostLoginPage