import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {HostAuthContext} from '../contexts/host-auth.context';

function HostLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();

    const { storeToken, setIsHostLoggedIn, authenticateHost } = useContext(HostAuthContext); 

    const handleSubmit = async event => {
        try {
            event.preventDefault();

            const response = await fetch(`${process.env.API_URL}host/login`, {
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
    <>
        <form onSubmit={handleSubmit}>
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
        <p>Don't have a host account yet? <Link to="/host/signup">Signup</Link></p>
        { errorMessage && <p>{errorMessage}</p> }
        

    </>
  )
}

export default HostLoginPage