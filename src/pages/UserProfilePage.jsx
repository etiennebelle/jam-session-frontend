import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';

function UserProfilePage() {
    const [currentUser, setCurrentUser] = useState();
    const { user, storedToken } = useContext(UserAuthContext);

    useEffect(() => {
        if (user){
            const getUserData = async() => {
                const response = await fetch(`${process.env.API_URL}user/${user.data._id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })
                const userData = await response.json();
                delete userData.password;
                setCurrentUser(userData);
            } 
            getUserData();
        }
    }, [user])

    return (
        <div>
            <h2>{currentUser && currentUser.username}!</h2>
            <h3>Your Upcoming Jam Sessions:</h3>
            {currentUser && currentUser.jamSessions.map(oneJam => {
                return( 
                    <div key={oneJam._id}>
                    <img src={oneJam.img}/>
                    <h4>{oneJam.jamSessionName}</h4>
                    <p>{oneJam.date}</p>
                    <p>{oneJam.time}</p>
                    <Link to={`/events/${oneJam._id}`}>More info</Link>
                    </div>
                )
            })} 

           
        </div>
    )
}

export default UserProfilePage