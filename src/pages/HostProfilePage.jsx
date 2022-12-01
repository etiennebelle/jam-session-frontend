import { useState, useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import { v4 as uuidv4 } from 'uuid';
import JamSession from "../components/JamSession";
import { format } from 'date-fns'
import {Button} from '@mantine/core'


function HostProfilePage() {
    const [currentHost, setCurrentHost] = useState('')
    const [jamSessions, setJamSessions] = useState([])
    const [futureEvents, setFutureEvents] = useState(true)
    const [pastOrFutureText, setPastOrFutureText] = useState('Past Jams')


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
      if (futureEvents) {
        setPastOrFutureText("Past Jams")
      } else {
        setPastOrFutureText("Upcoming Jams")
      }
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
      <div className='no-jams-ctn'>
          <h2>No jams sessions created yet</h2>
          <div className="no-jams-btn">
            <Link to="/host/create-jam-session" >
              <Button color="dark" radius="xl">
                Create Jam
              </Button>
            </Link>
          </div>
      </div>
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
    <div className="host-profile-main main">
      <div className="greeting-host greeting">
        <h2>Hello {currentHost && currentHost.barName}!</h2>
      </div>
      <div className='host-btns'>
        <Link to="/host/create-jam-session" >
          <Button color="dark" radius="xl">
            Create Jam
          </Button>
        </Link>
        <Button variant="outline" color="dark" radius="xl" onClick={handlePastClick}>
          {pastOrFutureText}
        </Button>
      </div>
      <section className='events'>
      <div className='section-title'>
        <h3>Your Scheduled Jam Sessions</h3>
      </div>
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
      </section>
    </div>
  )
}

export default HostProfilePage