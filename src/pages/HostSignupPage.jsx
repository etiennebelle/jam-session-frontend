import { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import Autocomplete from "react-google-autocomplete";

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
    <>
        <form onSubmit={handleSubmit}>
            <label>Bar Name: 
                <input 
                type="text" 
                value={barName} 
                onChange={event => setBarName(event.target.value)} 
                required/>
            </label>
            <label>Address: </label>
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
            <label>Email: 
                <input 
                type="text" 
                value={email} 
                onChange={event => setEmail(event.target.value)} 
                required/>
            </label>
            <label>Password: 
                <input 
                type="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                required
                />
            </label>
            <button type="submit">Signup</button>
        </form>
        <p>Already have an host account? <Link to="/host/login">Login</Link></p>
        { errorMessage && <p>{errorMessage}</p> }

    </>
  )
}

export default HostSignupPage