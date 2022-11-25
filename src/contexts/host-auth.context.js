
import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const HostAuthContext = createContext();

function HostAuthProviderWrapper(props) {
    const [isHostLoggedIn, setIsHostLoggedIn] = useState(false);
    const [host, setHost] = useState(null);

    const navigate = useNavigate();

    const storeToken = (token) => {       
      localStorage.setItem('hostAuthToken', token);
    }
    
    const authenticateHost = async () => {
      const storedToken = localStorage.getItem('hostAuthToken');
      if (storedToken) {
        const response = await fetch('http://localhost:5005/host/verify', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        const parsed = await response.json()
        setIsHostLoggedIn(true);
        setHost(parsed)
      } else {
        setIsHostLoggedIn(false);
        setHost(null)
      }
    }

    const removeHostToken = () => {
      localStorage.removeItem("hostAuthToken");
    }

    const logoutHost = () => {
      removeHostToken()
      authenticateHost()
      navigate('/host/login')
    }


    useEffect(() => {
      authenticateHost()
    }, []) 
    
   
    return (
      <HostAuthContext.Provider value={{ isHostLoggedIn, host, storeToken, authenticateHost, logoutHost, setIsHostLoggedIn}}>
        {props.children}
      </HostAuthContext.Provider>
    )
  }
  
  export { HostAuthProviderWrapper, HostAuthContext };
