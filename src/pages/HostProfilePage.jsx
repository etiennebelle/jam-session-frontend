import { useState, useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import { v4 as uuidv4 } from 'uuid';


function HostProfilePage() {
    const [currentHost, setCurrentHost] = useState('')
    const { isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  

    useEffect(() => {
      if (host) {
        const getHostData = async() => {
          const response = await fetch(`http://localhost:5005/host/${host.data._id}`)
          const hostData = await response.json();
          delete hostData.password;
          setCurrentHost(hostData);
      } 
      getHostData();
      }
    }, [host])

    const formatDate = (oneDate) => {
      return oneDate.slice(0,10)
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
        console.log(jamSessionId)
        await fetch(`http://localhost:5005/host/jam-sessions/${jamSessionId}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
    <>
      <p>Hello {currentHost && currentHost.barName}!</p>
      <Link to="/host/create-jam-session" >Create Jam Session</Link>
      <h3>Your Scheduled Jam Sessions: </h3>
      {currentHost && currentHost.jamSessions.map(oneJamSess =>{
        return(
          <div key={uuidv4()}>
          <img src={oneJamSess.image} />
          <h4>{oneJamSess.jamSessionName}</h4> 
          <p>Date: {formatDate(oneJamSess.date)}</p> 
          <p>Time: {oneJamSess.time}</p> 
          <p>Capacity: {oneJamSess.capacity}</p> 
          <p>Genre: {oneJamSess.genre}</p> 
          <p>Event Description: {oneJamSess.description}</p>
          <button onClick={()=>deleteJamSess(oneJamSess._id)}>Delete Jam Session</button>          
          </div>
        )
      })}

    </>
  )
}

export default HostProfilePage