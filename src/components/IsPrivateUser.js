import { useContext } from 'react';
import { UserAuthContext } from '../contexts/user-auth.context';
import { Navigate } from 'react-router-dom';

function IsPrivateUser(children) {

    const { isLoggedIn, isLoading } = useContext(UserAuthContext);

    if (isLoading) return <p>Loading ...</p>

    if (!isLoggedIn) {
        return <Navigate to="/user/login" />
    } else {
        return children
    }
}

export default IsPrivateUser