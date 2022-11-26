import { useContext } from "react";
import { HostAuthContext } from "../contexts/host-auth.context";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/user-auth.context";


function IsAnonymous({children}) {
    const { isHostLoggedIn } = useContext(HostAuthContext);
    const { isLoggedIn } = useContext(UserAuthContext);
    
    if (isHostLoggedIn || isLoggedIn ) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  
}

export default IsAnonymous