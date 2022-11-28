import { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';


function HostSignupPage() {
    const [barName, setBarName] = useState('')
    const [address, setAddress] = useState('')
    const [town, setTown] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    const { storedToken } = useContext(HostAuthContext);  

    const handleSubmit = async event => {
        try {
            event.preventDefault();

            const response = await fetch('http://localhost:5005/host/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                    Authorization: `Bearer ${storedToken}`,
                },
                body: JSON.stringify({barName, address, town, email, password})
            })
            const parsed = await response.json()
            if (response.status === 201) {
                navigate('/host/login')
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
            <label>Address: 
                <input 
                type="text" 
                value={address} 
                onChange={event => setAddress(event.target.value)} 
                required/>
            </label>
            <label>Town: 
                <input 
                type="text" 
                value={town} 
                onChange={event => setTown(event.target.value)} 
                required/>
            </label>
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