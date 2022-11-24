import { useContext, useEffect } from "react";                      
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const { isLoggedIn, host, authenticateHost, /* logoutHost */ } = useContext(HostAuthContext);  
    useEffect(() => {
    authenticateHost() 
    }, [])
    
  

  return (
    <>
    {isLoggedIn && 
      <>
      <h1>Hello!</h1>
      {/* button onClick={logoutHost}>Logout</button> */}
      </>
    }
    {!isLoggedIn && <h1>Please login as a host</h1>}


    </>
  )
}

export default HostProfilePage