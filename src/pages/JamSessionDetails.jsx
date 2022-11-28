import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { v4 as uuidv4 } from 'uuid';

function JamSessionDetails() {

    const API_URL = "http://localhost:5005";
    const { id } = useParams();
    const { isLoggedIn, user, storedToken } = useContext(UserAuthContext);
    const [jamSession, setJamSession] = useState();
    const [players, setPlayers] = useState([]);
    const [userAttending, setUserAttending] = useState(false)

    const navigate = useNavigate();

    const fetchJamId = async () => {
        try {
            const response = await fetch(`${API_URL}/events/${id}`);
            const parsed = await response.json();
            setJamSession(parsed);
            parsed.players.map((onePlayer)=> {
                ///to be checked 
                if (user && onePlayer._id == user.data._id) {
                    setUserAttending(true)
                }
            })            
        } catch (error) {
            console.log(error);
        }
    }

    const addPlayers = async () => {
        try {
            await fetch(`${API_URL}/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`,
                },
                body: JSON.stringify({id: user.data._id})
            })
            fetchJamId()
            setUserAttending(true)
        } catch (error) {
            console.log(error);
        }
    }
    
    const removePlayers = async () => {
        try {
            await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`,
                },
                body: JSON.stringify({id: user.data._id})
            })
            fetchJamId()
            setUserAttending(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchJamId();
    }, [])

    return jamSession ? (

        <div>
            <div className='jam-img-ctn'>
                <img src={jamSession.image} style={{width: '300px'}} />
            </div>
            <div className='jam-infos-ctn'>
                <div className='jam-title-ctn'>
                    <h2>{jamSession.jamSessionName}</h2>
                </div>
                <div className='jam-date-ctn'>
                    <p>{jamSession.date}</p>
                    <p>{jamSession.time}</p>
                </div>
                <div className='jam-host-ctn'>
                    <p>Created by: <Link to={``}>{jamSession.host.barName}</Link></p>
                    <p>{jamSession.host.address}, {jamSession.host.town}</p>
                </div>
                <div className='jam-description-ctn'>
                    <p>{jamSession.description}</p>
                </div>
            </div>

            <div className='players-ctn'>
                <h3>Artists that will be playing:</h3>
                <div className='users-playing'>
                {jamSession.players.map((onePlayer)=> {
                    return (
                        <div key={uuidv4()}>
                            <p>{onePlayer.username} as {onePlayer.instrument}</p>
                        </div>
                    )
                })}

                </div>
                {isLoggedIn ? (
                    <div>
                        {userAttending 
                            ? <div>
                                <p>You are attending this jam session</p>
                                <button type='submit' onClick={removePlayers}>Leave the Session!</button>
                            </div>
                            : <button type='submit' onClick={addPlayers}>Join the Session!</button> 
                        }
                    </div>
                ) : (
                    <div>
                        <p>You need to have an account to join the session!</p>
                        <Link to="/user/signup">Signup</Link>
                        <Link to="/user/login">Login</Link>
                    </div>
                )}
                
            </div>
        </div>

    ) : (<></>)
}

export default JamSessionDetails