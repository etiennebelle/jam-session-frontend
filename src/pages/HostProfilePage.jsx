import { useState, useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const [currentHost, setCurrentHost] = useState('')
    const { isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  

    console.log('host', host)
    console.log('isHostLoggedIn', isHostLoggedIn)


    useEffect(() => {
      if (host) {
        const getHostData = async() => {
          const response = await fetch(`http://localhost:5005/host/${host.data._id}`)
          const hostData = await response.json();
          delete hostData.password;
          console.log(hostData);
          setCurrentHost(hostData);
      } 
      getHostData();
      }
    }, [host])
    
  return (
    <>
      <p>Hello {currentHost && currentHost.barName}!</p>
      <Link to="/host/create-jam-session" >Create Jam Session</Link>
    </>
  )
}

export default HostProfilePage