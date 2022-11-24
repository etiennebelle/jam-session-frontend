import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


function HostSignupPage() {
    const [barName, setBarName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSubmit = async event => {
        try {
            event.preventDefault();

            const response = await fetch('http://localhost:5005/host/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify({barName, address, email, password})
            })
            const parsed = await response.json()
            console.log(parsed)
            navigate('/host/login')
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
            <label>Email: 
                <input 
                type="text" 
                value={email} 
                onChange={event => setEmail(event.target.value)} 
                required/>
            </label>
            <label>Password: 
                <input 
                type="text" 
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