
import { useState, useEffect, createContext } from "react";

const HostAuthContext = createContext();

function HostAuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [host, setHost] = useState(null);

    const storeToken = (token) => {       
      localStorage.setItem('hostAuthToken', token);
    }
    
    const authenticateHost = async () => {
      const storedToken = localStorage.getItem('hostAuthToken');
      if (storeToken) {
        const response = await fetch('http://localhost:5005/host/verify', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        const parsed = await response.json()
        console.log(parsed)
        setIsLoggedIn(true);
        setIsLoading(false)
        setHost(parsed)
        //// I don't think the above setHost works + payload undefined
      } else {
        setIsLoggedIn(true);
        setIsLoading(false);
        setHost(null)
      }
    }
   
    return (
      <HostAuthContext.Provider value={{ isLoggedIn, isLoading, host, storeToken, authenticateHost}}>
        {props.children}
      </HostAuthContext.Provider>
    )
  }
  
  export { HostAuthProviderWrapper, HostAuthContext };
