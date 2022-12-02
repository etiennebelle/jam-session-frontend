import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../contexts/user-auth.context';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Group } from '@mantine/core';
import UserLoginForm from '../components/UserLoginForm';
import UserLoginComponent from '../components/UserLoginComponent';

function JamSessionDetails() {

    // const API_URL = "http://localhost:5005";
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
            const res = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}events/${id}`);
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
                const resAdd = await fetch(`${process.env.REACT_APP_API_URL}events/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                    body: JSON.stringify({id: user.data._id})
                })
                fetchJamId()
                const resAddParsed = await resAdd.json()
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
            await fetch(`${process.env.REACT_APP_API_URL}events/${id}`, {
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
        <div className='details-main'>
            <div className='details-ctn'>
            <div className='cover'>
                <div className='jam-cover' style={{ backgroundImage: `url(${jamSession.image})` }}>
                    <div className='jam-name'><p><span className={`${jamSession.genre.toLowerCase()}`}></span>{jamSession.jamSessionName}</p></div>
                </div>
            </div>
            <div className='details-infos-ctn'>
            <div className='details-infos left'>
                <div className='jam-details-top'>
                    <p className='jam-date'>{jamSession.date}</p>
                    <p className='jam-time'>{jamSession.time.slice(16,21)}</p>
                </div>
                <div className='jam-details-host'>
                    <p>By: <Link to={`/locations/${jamSession.host._id}`}>{jamSession.host.barName}</Link></p>
                    <p>{jamSession.host.address}</p>
                </div>
                <div className='jam-details-description'>
                     <p>{jamSession.description}</p>
                </div>
            </div>
            <div className='details-players right'>
                <div className='section-title'>
                    <h4>Player</h4>
                </div>
                <div className='users-playing'>
                    {jamSession.players.map((onePlayer)=> {
                        return (
                            <div className='player-ctn' key={onePlayer._id}>
                                <div className='player-info player-name' >
                                    <p>{onePlayer.username}</p>
                                </div>
                                <div className='player-info player-instrument' >
                                    {onePlayer.instrument}
                                </div>
                            </div>
                        )
                    })}
                </div>
            
                <div className='players-btns'>
                    {maxCapacity ?
                        <div className='players-message'> 
                            <p>This event has already reached the max number of artists. If you want to join a jam session, <Link to='/events'>checkout other events!</Link></p>
                        </div>
                        : !isLoggedIn ? 
                        <div className='players-message'> 
                            <p>You need to login/signup to join the session</p> 
                            <Button type='button' onClick={()=> setOpened(true)} color="dark" radius="xl">
                                Login/Signup
                            </Button>
                        </div>
                        : userAttending  
                        ? 
                        <div className='players-message'>
                            <p>You are attending this jam session</p>
                            <Button type='button' onClick={removePlayers} color="dark" radius="xl">
                                Leave the Session!
                            </Button>
                        </div>
                        :
                        <div className='players-message'>
                            <Button type='button' onClick={addPlayers} color="dark" radius="xl">
                                Join the Session!
                            </Button>
                        </div>
                    }
                        </div>
                <Modal
                    opened={opened}
                    className="login-modal"
                    onClose={() => setOpened(false)}
                    title="Log in"
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
             </div>   
        </div>
    ) : (<></>)
}

export default JamSessionDetails

{/* <div className='details-main jam-session-infos'>
                <div className='jam-top'>
                    <p className='jam-date'>{jamSession.date}</p>
                    <p className='jam-time'>{jamSession.time.slice(16,21)}</p>
                </div>
                <div className='jam-host'>
                    <p>By: <Link to={`/locations/${jamSession.host._id}`}>{jamSession.host.barName}</Link></p>
                    <p>{jamSession.host.address}</p>
                </div>
                <div className='jam-infos-ctn'>
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
                </div>
            </div>  */}