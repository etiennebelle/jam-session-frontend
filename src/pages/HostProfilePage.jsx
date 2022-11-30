import { useState, useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import { v4 as uuidv4 } from 'uuid';
import JamSession from "../components/JamSession";
import { format } from 'date-fns'


function HostProfilePage() {
    const [currentHost, setCurrentHost] = useState('')
    const [jamSessions, setJamSessions] = useState([])
    const [futureEvents, setFutureEvents] = useState(true)

    const { storedToken, isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  

    const getHostData = async() => {
      if (futureEvents) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}host/${host.data._id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        const hostData = await response.json();
        delete hostData.password;
        setCurrentHost(hostData);
        setJamSessions(hostData.jamSessions)
      } else {
        const response = await fetch(`${process.env.REACT_APP_API_URL}host/${host.data._id}/past-jam-sessions`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        const hostData = await response.json();
        delete hostData.password;
        setCurrentHost(hostData);
        setJamSessions(hostData.jamSessions)
      }
    } 

    const handlePastClick = () => {
      setFutureEvents(!futureEvents)
      getHostData()
    }


    useEffect(() => {
      if (host) {
      getHostData();
      }
    }, [host])

    const formatDate = (oneDate) => {
      return format(new Date(oneDate), 'PPPP');
    }

    if (currentHost && currentHost.jamSessions.length < 1){
      return (
      <>
      <p>No jams sessions created yet</p>
      <Link to="/host/create-jam-session" >Create Jam Session</Link>
      </>
      )
    } 

    const deleteJamSess = async (jamSessionId) => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}host/${jamSessionId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        getHostData();
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
    <>
      <p>Hello {currentHost && currentHost.barName}!</p>
      <Link to="/host/create-jam-session" >Create Jam Session</Link>
      <button type="button" onClick={handlePastClick}>Your Past Events</button>
      <h3>Your Scheduled Jam Sessions: </h3>
      {jamSessions && jamSessions.map(oneJamSess =>{
        return(
          <JamSession 
            key={uuidv4()} 
            oneJamSess={oneJamSess} 
            deleteJamSess={deleteJamSess} 
            formatDate={formatDate}
            hostid={ host.data._id}
            jamSessions={jamSessions}
            setJamSessions={setJamSessions}
          />
        )
      })}

    </>
  )
}

export default HostProfilePage