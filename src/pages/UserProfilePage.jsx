import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';

function UserProfilePage() {
    const [currentUser, setCurrentUser] = useState();
    const { user } = useContext(UserAuthContext);

    useEffect(() => {
        if (user){
            const getUserData = async() => {
                const response = await fetch(`http://localhost:5005/user/${user.data._id}`)
                const userData = await response.json();
                delete userData.password;
                setCurrentUser(userData);
            } 
            getUserData();
        }
    }, [user])

    return (
        <div>
            <h2>Hi {currentUser && currentUser.username}!</h2>
            
        </div>
    )
}

export default UserProfilePage