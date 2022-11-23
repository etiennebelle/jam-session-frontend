import { useContext } from "react";                      
import {HostAuthContext} from '../contexts/host-auth.context';
 

function HostProfilePage() {
    const { isLoggedIn, host } = useContext(HostAuthContext);  
  return (
    <>
    {isLoggedIn && <h1>Hello Host!</h1>}
    {!isLoggedIn && <h1>Please login as a host</h1>}


    </>
  )
}

export default HostProfilePage