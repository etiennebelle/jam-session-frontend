import { useContext, useEffect } from "react";                      
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const { isLoggedIn, host, authenticateHost, } = useContext(HostAuthContext);  
    useEffect(() => {
    authenticateHost() 
    }, [])
    
  

  return (
    <>
    {isLoggedIn && 
      <>
      <h1>Hello!</h1>
      </>
    }
    {!isLoggedIn && <h1>Please login as a host</h1>}


    </>
  )
}

export default HostProfilePage