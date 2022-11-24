import { useContext, useEffect } from "react";                      
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const { isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  
    useEffect(() => {
    authenticateHost() 
    }, [])
    
  

  return (
    <>
    {isHostLoggedIn && 
      <>
      <h1>Hello!</h1>
      </>
    }
    {!isHostLoggedIn && <h1>Please login as a host</h1>}


    </>
  )
}

export default HostProfilePage