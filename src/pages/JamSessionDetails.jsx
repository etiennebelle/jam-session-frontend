import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Group } from '@mantine/core';
import UserLoginForm from '../components/UserLoginForm';
import UserLoginComponent from '../components/UserLoginComponent';

function JamSessionDetails() {

    const API_URL = "http://localhost:5005";
    const { id } = useParams();
    const { isLoggedIn, user, storedToken } = useContext(UserAuthContext);
    const [jamSession, setJamSession] = useState();
    const [userAttending, setUserAttending] = useState(false)
    const [opened, setOpened] = useState(false);
    const [maxCapacity, setMaxCapacity] = useState(false);


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState()

    const { storeToken, setIsLoggedIn, authenticateUser } = useContext(UserAuthContext);

    const handleSubmit = async event => { 
        try {
            event.preventDefault();
            const res = await fetch('http://localhost:5005/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
            const parsed = await res.json();
            storeToken(parsed.authToken);
            if (res.status === 200) {
                setIsLoggedIn(true);
                authenticateUser();
                setOpened(false)
            } else {
                setErrorMessage(parsed.message)
            }

        } catch (error) {
            console.log(error);
            const errorDescription = error.message;
            setErrorMessage(errorDescription);
        }
    }

    const fetchJamId = async () => {
        try {
            const response = await fetch(`${API_URL}/events/${id}`);
            const parsed = await response.json();
            setJamSession(parsed);
            setUserAttending(parsed.players.some((onePlayer)=> onePlayer._id == user.data._id))
        } catch (error) {
            console.log(error);
        }
    }

    const addPlayers = async () => {
        try {
            if (user) {
                const resAdd = await fetch(`${API_URL}/events/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                    body: JSON.stringify({id: user.data._id})
                })
                fetchJamId()
                const resAddParsed = await resAdd.json()
                console.log(resAddParsed.message)
                if (resAddParsed.message == "This jam session is full") {
                    setMaxCapacity(true)
                }
            }
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

    useEffect(() => {
        fetchJamId();
    }, [user])
    


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
                    <p>Created by: <Link to={`/locations/${jamSession.host._id}`}>{jamSession.host.barName}</Link></p>
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
                        <div key={onePlayer._id}>
                            <p>{onePlayer.username} as {onePlayer.instrument}</p>
                        </div>
                    )
                })}

                </div>
                <div>
                    {maxCapacity ? <p>This event has already reached the max number of artists. If you want to join a jam session, checkout other events!</p>
                        : !isLoggedIn 
                        ? <div> 
                        <p>You need to login/signup to join the session</p> 
                        <button type='button' onClick={()=> setOpened(true)}>Login/Signup </button> 
                        </div>
                        : userAttending  
                        ? 
                        <div>
                            <p>You are attending this jam session</p>
                            <button type='button' onClick={removePlayers}>Leave the Session!</button>
                        </div>
                        : <button type='button' onClick={addPlayers}>Join the Session!</button> 
                    }
                </div>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Login"
                >
                    <UserLoginComponent
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        errorMessage={errorMessage}
                    />
                </Modal>

                
            </div>
        </div>

    ) : (<></>)
}

export default JamSessionDetails