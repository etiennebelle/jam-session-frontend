import { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import Autocomplete from "react-google-autocomplete";
import { TextInput, PasswordInput, Textarea, Select, FileInput, NumberInput, Button } from '@mantine/core';


function HostSignupPage() {
    const [barName, setBarName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, setIsHostLoggedIn, authenticateHost } = useContext(HostAuthContext); 

    const handleSubmit = async event => {
        try {
            event.preventDefault();

            const response = await fetch(`${process.env.REACT_APP_API_URL}host/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify({barName, address, email, password})
            })
            const parsed = await response.json()
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}host/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify({email, password})
            })
            const parsedLoginRes = await loginResponse.json()
            storeToken(parsedLoginRes.authToken)

            if (response.status === 201) {
                setIsHostLoggedIn(true)
                authenticateHost();
                navigate('/host/profile')
              } else if (response.status === 400){
                setErrorMessage(parsed.message)
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
            <h3>Host Sign Up</h3>
        </div>
        <div className='labels-ctn'>
        <form className='crud-form' onSubmit={handleSubmit}>
            <label className='create-label'> 
                <TextInput 
                type="text" 
                placeholder="Location Name"
                value={barName} 
                radius="xs"
                onChange={event => setBarName(event.target.value)} 
                required/>
            </label>
            <label className='create-label'> 
        
            <Autocomplete
                apiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
                onPlaceSelected={(place) => {
                    setAddress(place.formatted_address);
                }}
                options={{
                    types: ["geocode", "establishment"],
                  }}
                value={address} 
                onChange={event => setAddress(event.target.value)} 
                placeholder=""
                required
            />
            </label>
            <label className='create-label'>
                <TextInput 
                type="text" 
                placeholder="Email"
                radius="xs"
                value={email} 
                onChange={event => setEmail(event.target.value)} 
                required/>
            </label>
            <label className='create-label'>
                <PasswordInput 
                type="password" 
                value={password} 
                description="Password must include at least one letter, number and special character"
                radius="xs"
                onChange={event => setPassword(event.target.value)} 
                required
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
        <p>Already have an host account? <Link to="/host/login">Login</Link></p>
        { errorMessage && <p>{errorMessage}</p> }

    </div>
  )
}

export default HostSignupPage