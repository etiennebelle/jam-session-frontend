import { useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const { isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  
    useEffect(() => {
    authenticateHost() 
    }, [])
    
  

  return (
    <>
      <Link to="/host/create-jam-session" >Create Jam Session</Link>
    </>
  )
}

export default HostProfilePage