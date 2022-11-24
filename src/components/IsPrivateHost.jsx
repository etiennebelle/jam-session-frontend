import { useContext } from "react";
import { HostAuthContext } from "../contexts/host-auth.context";
import { Navigate } from "react-router-dom";

function IsPrivateHost( { children } ) {
  
    const { isHostLoggedIn } = useContext(HostAuthContext);
   
    if (!isHostLoggedIn) {
      console.log('not loggedin ')
      return <Navigate to="/host/login" />;
      
    } else {
      return children;
    }
  }
   
  export default IsPrivateHost;