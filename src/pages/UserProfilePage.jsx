import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { format } from 'date-fns'

function UserProfilePage() {
    const [currentUser, setCurrentUser] = useState();
    const { user, storedToken } = useContext(UserAuthContext);

    useEffect(() => {
        if (user){
            const getUserData = async() => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}user/${user.data._id}`, {
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

    const formatDate = (oneDate) => {
        return format(new Date(oneDate), 'PPPP');
      }

    return (
        <div>
            <h2>{currentUser && currentUser.username}!</h2>
            <h3>Your Upcoming Jam Sessions:</h3>
            {currentUser && currentUser.jamSessions.map(oneJam => {
                return( 
                    <div key={oneJam._id}>
                    <img src={oneJam.img}/>
                    <h4>{oneJam.jamSessionName}</h4>
                    <p>{formatDate(oneJam.date)}</p>
                    <p>{oneJam.time.slice(16,21)}</p>
                    <Link to={`/events/${oneJam._id}`}>More info</Link>
                    </div>
                )
            })} 

           
        </div>
    )
}

export default UserProfilePage