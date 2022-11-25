import { useContext } from "react";
import { HostAuthContext } from "../contexts/host-auth.context";
import { Navigate } from "react-router-dom";

function IsPrivateHost( { children } ) {
  
    const { isHostLoggedIn, isLoading } = useContext(HostAuthContext);
    console.log('isHostLoggedIn', isHostLoggedIn)
    
    if (isLoading) return <p>Loading ...</p>

    if (!isHostLoggedIn) {
      return <Navigate to="/host/login" />;
      
    } else {
      return children;
    }
  }
   
  export default IsPrivateHost;