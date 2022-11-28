import { useState, useContext, useEffect } from "react";                      
import { Link } from "react-router-dom";
import {HostAuthContext} from '../contexts/host-auth.context';
import { v4 as uuidv4 } from 'uuid';
import JamSession from "../components/JamSession";


function HostProfilePage() {
    const [currentHost, setCurrentHost] = useState('')
    const { isHostLoggedIn, host, authenticateHost } = useContext(HostAuthContext);  

    const getHostData = async() => {
      const response = await fetch(`http://localhost:5005/host/${host.data._id}`)
      const hostData = await response.json();
      delete hostData.password;
      setCurrentHost(hostData);
    
    } 
    useEffect(() => {
      if (host) {
      getHostData();
      }
    }, [host])

    const hostid = host.data._id
    if (!hostid){
        return <p>Loading...</p>
    }  

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
        await fetch(`http://localhost:5005/host/${jamSessionId}`, {
          method: 'DELETE',
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
      <h3>Your Scheduled Jam Sessions: </h3>
      {currentHost && currentHost.jamSessions.map(oneJamSess =>{
        return(
          <JamSession 
          key={uuidv4()} 
          oneJamSess={oneJamSess} 
          deleteJamSess={deleteJamSess} 
          formatDate={formatDate}
          hostid={hostid}
          />
        )
      })}

    </>
  )
}

export default HostProfilePage