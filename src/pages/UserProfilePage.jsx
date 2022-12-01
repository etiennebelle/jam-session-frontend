import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { format } from 'date-fns'
import { Button } from '@mantine/core';

function UserProfilePage() {
    const [currentUser, setCurrentUser] = useState();
    const [futureEvents, setFutureEvents] = useState(true)

    const { user, storedToken } = useContext(UserAuthContext);

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

    const getUserDataPast = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}user/${user.data._id}/past-jam-sessions`, {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            },
        })
        const userData = await response.json();
        delete userData.password;
        setCurrentUser(userData);
    }

    useEffect(() => {
        if (user){
            if (futureEvents) {
                getUserData();
            } else {
                getUserDataPast()
            }
        }
    }, [user])


    const handlePastClick = () => {
        setFutureEvents(!futureEvents)
        if (futureEvents) {
            getUserData();
        } else {
            getUserDataPast()
        }
    }

    if (currentUser && currentUser.jamSessions.length < 1){
        return (
        <div className='user-profile-main main'>
            <div className='no-jams-ctn'>
                <h2>You didn't sign up for any jam sessions yet!</h2>
                <div className="no-jams-btn">
                <Link to="/events" >
                    <Button color="dark" radius="xl">
                    Explore Jam Sessions
                    </Button>
                </Link>
                </div>
            </div>
        </div>
        )
    } 

    const formatDate = (oneDate) => {
        return format(new Date(oneDate), 'PPPP');
      }
    
    return (
        <div className="user-profile-main main">
            <div className="greeting-host greeting">
                <h2>{currentUser && currentUser.username}!</h2>
            </div>
            <div className='host-btns'>
                <Button variant="outline" color="dark" radius="xl" type="button" onClick={handlePastClick}>Your Past Events</Button>
            </div>
            <section>
            <div className='section-title'>
                <h3>Your Upcoming Jam Sessions:</h3>
            </div>
                {currentUser && currentUser.jamSessions.map(oneJam => {
                    return( 
                        <div className="jam-session-card" key={oneJam._id}>
                            <div className='jam-top'>
                                <p className='jam-date'>{formatDate(oneJam.date)}</p>
                                <p className='jam-time'>{oneJam.time.slice(16,21)}</p>
                            </div>
                            
                            <Link to={`/events/${oneJam._id}`}>
                                <div className='jam-main' style={{ backgroundImage: `url(${oneJam.image})` }}>
                                    <div className='jam-name'><p><span className={`${oneJam.genre.toLowerCase()}`}></span>{oneJam.jamSessionName}</p></div>
                                </div>
                            </Link>
                            <div className='jam-bottom'>
                                <p>{oneJam.genre}</p> 
                            </div> 
                        </div>
                    )
                })} 
            </section>
                

        </div>
    )
}

export default UserProfilePage