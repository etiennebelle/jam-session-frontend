import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { format } from 'date-fns'
import { Button } from '@mantine/core';

function UserProfilePage() {
    const [currentUser, setCurrentUser] = useState();
    const [futureEvents, setFutureEvents] = useState(true)
    const [pastOrFutureText, setPastOrFutureText] = useState('Past Jams')
    const [pastOrFutureTitle, setPastOrFutureTitle] = useState('Upcoming Jam')
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
            setPastOrFutureText("Past Jams")
            setPastOrFutureTitle('Upcoming Jam')
        } else {
            getUserDataPast()
            setPastOrFutureText("Upcoming Jams")
            setPastOrFutureTitle('Past Jam')
        }
    }

    const formatDate = (oneDate) => {
        return format(new Date(oneDate), 'PPPP');
      }
    
    return (
        <div className="host-profile-main main">
            <div className="greeting-host greeting">
                <h2>{currentUser && currentUser.username}!</h2>
            </div>
            <div className='host-btns'>
                <Button variant="outline" color="dark" radius="xl" type="button" onClick={handlePastClick}>Your {pastOrFutureText}</Button>
            </div>
            <section>
            <div className='section-title'>
                <h3>{`Your ${pastOrFutureTitle} Sessions`}</h3>
            </div>
            { currentUser && currentUser.jamSessions.length >= 1 ?
                currentUser.jamSessions.map(oneJam => {
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
                })
            : <p>No Jam Sessions Here</p>
            } 
            </section>
                

        </div>
    )
}

export default UserProfilePage